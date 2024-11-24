const productTransformer = require('../../../src/api/utils/productTransformer');

describe('productTransformer', () => {
    it('should correctly transform product data and description', () => {
        const mockProduct = {
            id: '123',
            title: 'Sample Product',
            price: 100,
            currency_id: 'USD',
            pictures: [{ url: 'http://example.com/image.jpg' }],
            condition: 'new',
            shipping: { free_shipping: true },
        };

        const mockDescription = 'This is a sample description.';

        const expectedResult = {
            item: {
                id: '123',
                title: 'Sample Product',
                price: {
                    currency: 'USD',
                    amount: 100,
                },
                picture: 'http://example.com/image.jpg',
                condition: 'new',
                free_shipping: true,
                description: 'This is a sample description.',
            },
        };

        const result = productTransformer(mockProduct, mockDescription);
        expect(result).toEqual(expectedResult);
    });

    it('should throw an error if the product is not an object', () => {
        expect(() => productTransformer(null, 'description')).toThrow(
            'Invalid data provided for transformation.'
        );

        expect(() => productTransformer('not-an-object', 'description')).toThrow(
            'Invalid data provided for transformation.'
        );
    });

    it('should handle a product without images correctly', () => {
        const mockProduct = {
            id: '123',
            title: 'Sample Product',
            price: 100,
            currency_id: 'USD',
            pictures: [], // No images
            condition: 'new',
            shipping: { free_shipping: true },
        };

        const mockDescription = 'Description without image.';

        expect(() => productTransformer(mockProduct, mockDescription)).toThrow(
            "Cannot read properties of undefined (reading 'url')"
        );
    });
});
