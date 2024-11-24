const { productController } = require('../../src/api/controllers/productController');
const { fetchProduct, fetchProductDetails } = require('../../src/services/productService');
const productTransformer = require('../../src/api/utils/productTransformer');

// Mock dependencies
jest.mock('../../src/services/productService');
jest.mock('../../src/api/utils/productTransformer');

describe('productController', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            params: { id: '123' }, // Example ID
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });

    it('should return a 400 error if the ID parameter is missing', async () => {
        req.params.id = undefined; // Simulate a request without ID
        await productController(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Required parameters are missing' });
    });

    it('should return correctly transformed data', async () => {
        const mockProduct = { id: '123', name: 'Product Name' };
        const mockProductDetails = { plain_text: 'Description text' };
        const mockTransformedData = { id: '123', name: 'Product Name', description: 'Description text' };

        fetchProduct.mockResolvedValue(mockProduct);
        fetchProductDetails.mockResolvedValue(mockProductDetails);
        productTransformer.mockReturnValue(mockTransformedData);

        await productController(req, res, next);

        expect(fetchProduct).toHaveBeenCalledWith('123');
        expect(fetchProductDetails).toHaveBeenCalledWith('123');
        expect(productTransformer).toHaveBeenCalledWith(mockProduct, mockProductDetails.plain_text);
        expect(res.json).toHaveBeenCalledWith(mockTransformedData);
    });

    it('should handle errors and call next', async () => {
        const mockError = new Error('Service error');
        fetchProduct.mockRejectedValue(mockError);

        await productController(req, res, next);

        expect(next).toHaveBeenCalledWith(mockError);
    });
});
