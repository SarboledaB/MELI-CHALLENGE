import { render, screen, waitFor } from '@testing-library/react';
import ProductList from './ProductList';
import { CategoriesContext } from '../../hooks/CategoriesProvider.jsx';
import productService from '../../services/products/products.js';
import { useLocation, useNavigate } from 'react-router-dom';

jest.mock('../../services/products/products.js');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));

describe('ProductList Component', () => {
  let navigate;

  beforeEach(() => {
    jest.clearAllMocks();
    delete window.location;
    window.location = { search: '?search=test' };
    useLocation.mockReturnValue({ search: '?search=test' });
    useNavigate.mockReturnValue(navigate);
  });

  it('renders the skeleton while loading', () => {
    productService.searchProducts.mockResolvedValueOnce({ items: null, categories: [] });

    render(
      <CategoriesContext.Provider value={{ categories: [], setCategories: jest.fn() }}>
        <ProductList />
      </CategoriesContext.Provider>
    );

    expect(screen.getByTestId('product-list-skeleton')).toBeInTheDocument();
  });

  it('renders the product list after fetching data', async () => {
    const mockProducts = [
      {
        id: '1',
        picture: '/product1.jpg',
        title: 'Product 1',
        price: { amount: 100, currency: 'USD' },
        free_shipping: true,
        condition: 'New',
      },
      {
        id: '2',
        picture: '/product2.jpg',
        title: 'Product 2',
        price: { amount: 200, currency: 'USD' },
        free_shipping: false,
        condition: 'Used',
      },
    ];

    productService.searchProducts.mockResolvedValueOnce({
      items: mockProducts,
      categories: ['Category 1'],
    });

    render(
      <CategoriesContext.Provider value={{ categories: [], setCategories: jest.fn() }}>
        <ProductList />
      </CategoriesContext.Provider>
    );

    await waitFor(() => expect(screen.getByText('Product 1')).toBeInTheDocument());
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  it('updates categories in context after fetching data', async () => {
    const mockSetCategories = jest.fn();
    productService.searchProducts.mockResolvedValueOnce({
      items: [],
      categories: ['Category 1', 'Category 2'],
    });

    render(
      <CategoriesContext.Provider value={{ categories: [], setCategories: mockSetCategories }}>
        <ProductList />
      </CategoriesContext.Provider>
    );

    await waitFor(() => expect(mockSetCategories).toHaveBeenCalledWith(['Category 1', 'Category 2']));
  });

  it('sets products and categories to empty arrays when search is falsy', async () => {

    window.location.search = '';

    const mockSetCategories = jest.fn();

    render(
      <CategoriesContext.Provider value={{ categories: [], setCategories: mockSetCategories }}>
        <ProductList />
      </CategoriesContext.Provider>
    );
    expect(screen.queryByTestId('product-item')).not.toBeInTheDocument();
  });
});
