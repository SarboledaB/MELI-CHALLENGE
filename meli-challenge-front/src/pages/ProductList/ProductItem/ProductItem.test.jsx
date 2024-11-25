import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import ProductItem from './ProductItem';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('ProductItem Component', () => {
  const mockNavigate = jest.fn();
  const mockProduct = {
    id: '123',
    picture: 'https://via.placeholder.com/150',
    title: 'Sample Product',
    price: { amount: 1000, currency: 'ARG' },
    free_shipping: true,
    condition: 'New',
  };

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders product details correctly', () => {
    render(
      <MemoryRouter>
        <ProductItem product={mockProduct} />
      </MemoryRouter>
    );

    // Check image
    const productImage = screen.getByTestId('product-item-image');
    expect(productImage).toHaveAttribute('src', mockProduct.picture);
    expect(productImage).toHaveAttribute('alt', mockProduct.title);

    // Check title
    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();

    // Check condition
    expect(screen.getByText(mockProduct.condition)).toBeInTheDocument();
  });

  test('navigates to product details on click', () => {
    render(
      <MemoryRouter>
        <ProductItem product={mockProduct} />
      </MemoryRouter>
    );

    const productItem = screen.getByTestId('product-item');
    fireEvent.click(productItem);

    expect(mockNavigate).toHaveBeenCalledWith(`/items/${mockProduct.id}`);
  });
});
