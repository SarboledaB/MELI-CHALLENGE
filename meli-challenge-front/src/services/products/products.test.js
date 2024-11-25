import axios from 'axios';
import productService from './products';

jest.mock('axios');

describe('productService', () => {
  describe('searchProducts', () => {
    it('should return data when searchProducts is called with a query', async () => {
      const query = 'test';
      const mockData = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];

      axios.get.mockResolvedValueOnce({ data: mockData });

      const result = await productService.searchProducts(query);

      expect(axios.get).toHaveBeenCalledWith(`http://localhost:3000/api/items?q=${query}`);
      expect(result).toEqual(mockData);
    });

    it('should throw an error if the API call fails', async () => {
      const query = 'test';
      const mockError = new Error('Network error');

      axios.get.mockRejectedValueOnce(mockError);

      await expect(productService.searchProducts(query)).rejects.toThrow('Network error');
      expect(axios.get).toHaveBeenCalledWith(`http://localhost:3000/api/items?q=${query}`);
    });
  });

  describe('getProduct', () => {
    it('should return data when getProduct is called with a productId', async () => {
      const productId = '123';
      const mockData = { id: '123', name: 'Product 123' };

      axios.get.mockResolvedValueOnce({ data: mockData });

      const result = await productService.getProduct(productId);

      expect(axios.get).toHaveBeenCalledWith(`http://localhost:3000/api/items/${productId}`);
      expect(result).toEqual(mockData);
    });

    it('should throw an error if the API call fails', async () => {
      const productId = '123';
      const mockError = new Error('Network error');

      axios.get.mockRejectedValueOnce(mockError);

      await expect(productService.getProduct(productId)).rejects.toThrow('Network error');
      expect(axios.get).toHaveBeenCalledWith(`http://localhost:3000/api/items/${productId}`);
    });
  });
});
