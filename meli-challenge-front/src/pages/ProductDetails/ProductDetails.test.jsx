import { render, screen, waitFor } from '@testing-library/react';
import ProductDetails from './ProductDetails';
import productService from '../../services/products/products';
import { useParams } from 'react-router-dom';

// Mock the productService.getProduct method
jest.mock('../../services/products/products.js', () => ({
  getProduct: jest.fn(),
}));

// Mock the useParams hook
jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
}));

describe('ProductDetails', () => {
  const mockProduct = {
    id: '123',
    title: 'Test Product',
    description: 'This is a test product.',
    picture: 'test-image.jpg',
    condition: 'new',
    price: {
      amount: 1000,
    },
  };

  beforeEach(() => {
    // Mock the implementation of useParams to return a specific id
    useParams.mockReturnValue({ id: '123' });
  });

  it('should fetch and display product details based on id from params', async () => {
    productService.getProduct.mockResolvedValue({ item: mockProduct });

    render(<ProductDetails />);

    // Verify that the product details are rendered after fetch
    await waitFor(() => screen.getByText(mockProduct.title));

    // Check if the product data is displayed correctly
    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
    expect(screen.getByText('new')).toBeInTheDocument();
    expect(screen.getByText('ARG 1.000')).toBeInTheDocument();
    expect(screen.getByAltText(mockProduct.title)).toHaveAttribute(
      'src',
      mockProduct.picture
    );
  });

  it('should call productService.getProduct with the correct id', async () => {
    productService.getProduct.mockResolvedValue({ item: mockProduct });

    render(<ProductDetails />);

    await waitFor(() => screen.getByText(mockProduct.title));

    // Verify that productService.getProduct was called with the correct id
    expect(productService.getProduct).toHaveBeenCalledWith('123');
  });

  it('should handle price formatting correctly', async () => {
    productService.getProduct.mockResolvedValue({ item: mockProduct });

    render(<ProductDetails />);

    await waitFor(() => screen.getByText(mockProduct.title));

    // Verify that the formatted price is displayed correctly
    expect(screen.getByText('ARG 1.000')).toBeInTheDocument();
  });

  it('should not render the product if id is null', () => {
    useParams.mockReturnValue({ id: null });

    render(<ProductDetails />);

    // Verify that product details are not rendered
    expect(screen.queryByText(mockProduct.title)).not.toBeInTheDocument();
    expect(screen.queryByText(mockProduct.description)).not.toBeInTheDocument();
  });
});
