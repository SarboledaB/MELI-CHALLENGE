const { fetchProduct, fetchProductDetails } = require('../../src/services/productService');
const apiClient = require('../../src/utils/apiClient');

// Mock apiClient
jest.mock('../../src/utils/apiClient');

describe('productService', () => {
    describe('fetchProduct', () => {
        it('should return product data when the API responds successfully', async () => {
            const productId = '123';
            const mockResponse = { id: '123', title: 'Sample Product' };

            // Simulate API response
            apiClient.get.mockResolvedValue({ data: mockResponse });

            const result = await fetchProduct(productId);
            expect(apiClient.get).toHaveBeenCalledWith(`/items/${productId}`);
            expect(result).toEqual(mockResponse);
        });

        it('should throw an error when the API fails', async () => {
            const productId = '123';

            // Simulate an API error
            apiClient.get.mockRejectedValue(new Error('API Error'));

            await expect(fetchProduct(productId)).rejects.toThrow(
                'Error while querying the external API'
            );
            expect(apiClient.get).toHaveBeenCalledWith(`/items/${productId}`);
        });
    });

    describe('fetchProductDetails', () => {
        it('should return product details when the API responds successfully', async () => {
            const productId = '123';
            const mockResponse = { plain_text: 'Product description' };

            // Simulate API response
            apiClient.get.mockResolvedValue({ data: mockResponse });

            const result = await fetchProductDetails(productId);
            expect(apiClient.get).toHaveBeenCalledWith(`/items/${productId}/description`);
            expect(result).toEqual(mockResponse);
        });

        it('should throw an error when the API fails', async () => {
            const productId = '123';

            // Simulate an API error
            apiClient.get.mockRejectedValue(new Error('API Error'));

            await expect(fetchProductDetails(productId)).rejects.toThrow(
                'Error while querying the external API'
            );
            expect(apiClient.get).toHaveBeenCalledWith(`/items/${productId}/description`);
        });
    });
});
