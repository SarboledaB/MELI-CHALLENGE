import { render, screen, waitFor } from '@testing-library/react';
import ProductDetails from './ProductDetails';
import { useParams } from 'react-router-dom';
import { CategoriesContext } from '../../hooks/CategoriesProvider.jsx';
import productService from '../../services/products/products.js';
import { formatCurrency } from '../../utils/priceTransform';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

jest.mock('../../services/products/products.js');
jest.mock('../../utils/priceTransform');

describe('ProductDetails Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the skeleton while loading', () => {
    useParams.mockReturnValue({ id: '123' });
    productService.getProduct.mockResolvedValueOnce({ item: null });

    render(
      <CategoriesContext.Provider value={{ categories: [] }}>
        <ProductDetails />
      </CategoriesContext.Provider>
    );

    expect(screen.getByTestId('product-details-skeleton')).toBeInTheDocument();
  });

  it('renders product details after fetching data', async () => {
    useParams.mockReturnValue({ id: '123' });

    const mockProduct = {
      picture: '/image.jpg',
      title: 'Mock Product',
      condition: 'New',
      sold_quantity: 10,
      price: { amount: 100, currency: 'USD' },
      description: 'This is a mock description.',
    };

    productService.getProduct.mockResolvedValueOnce({ item: mockProduct });

    formatCurrency.mockReturnValueOnce('$ 100');

    render(
      <CategoriesContext.Provider value={{ categories: ['Electronics'] }}>
        <ProductDetails />
      </CategoriesContext.Provider>
    );

    await waitFor(() => expect(screen.getByText('Mock Product')).toBeInTheDocument());

    expect(screen.getByText('Mock Product')).toBeInTheDocument();
    expect(screen.getByText('New 10')).toBeInTheDocument();
    expect(screen.getByText('$ 100')).toBeInTheDocument();
    expect(screen.getByText('This is a mock description.')).toBeInTheDocument();
    expect(screen.getByAltText('Mock Product')).toHaveAttribute('src', '/image.jpg');
    expect(screen.getByText('Electronics')).toBeInTheDocument();
  });

  it('Should not render when id is empty', async () => {
    useParams.mockReturnValue({ id: '' });

    render(
      <CategoriesContext.Provider value={{ categories: ['Electronics'] }}>
        <ProductDetails />
      </CategoriesContext.Provider>
    );

    expect(screen.queryByTestId('product-details')).not.toBeInTheDocument();
  });

  it('renders formatted price correctly', async () => {
    useParams.mockReturnValue({ id: '123' });

    const mockProduct = {
      picture: '/image.jpg',
      title: 'Mock Product',
      condition: 'New',
      sold_quantity: 10,
      price: { amount: 100, currency: 'USD' },
      description: 'This is a mock description.',
    };

    productService.getProduct.mockResolvedValueOnce({ item: mockProduct });

    formatCurrency.mockReturnValueOnce(null);

    render(
      <CategoriesContext.Provider value={{ categories: ['Electronics'] }}>
        <ProductDetails />
      </CategoriesContext.Provider>
    );

    await waitFor(() => expect(screen.getByText('Mock Product')).toBeInTheDocument());

    expect(screen.queryByText('$ 100')).not.toBeInTheDocument();
    expect(formatCurrency).toHaveBeenCalledWith(mockProduct.price.amount, mockProduct.price.currency);
  });
});
