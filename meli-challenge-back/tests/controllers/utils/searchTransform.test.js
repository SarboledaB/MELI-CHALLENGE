const searchTransformer = require('../../../src/api/utils/searchTransformer');

describe('searchTransformer', () => {
    it('should correctly transform the search data', () => {
        const mockSearchData = {
            filters: [
                {
                    id: 'category',
                    values: [
                        {
                            path_from_root: [
                                { name: 'Electronics' },
                                { name: 'Laptops' },
                            ],
                        },
                    ],
                },
            ],
            results: [
                {
                    id: '123',
                    title: 'Laptop',
                    sale_price: {
                        currency_id: 'USD',
                        amount: 999,
                        decimals: 2,
                    },
                    thumbnail: 'http://example.com/laptop.jpg',
                    condition: 'new',
                    shipping: { free_shipping: true },
                },
            ],
        };

        const expectedResult = {
            categories: [['Electronics', 'Laptops']],
            items: [
                {
                    id: '123',
                    title: 'Laptop',
                    price: {
                        currency: 'USD',
                        amount: 999,
                        decimals: 2,
                    },
                    picture: 'http://example.com/laptop.jpg',
                    condition: 'new',
                    free_shipping: true,
                },
            ],
        };

        const result = searchTransformer(mockSearchData);
        expect(result).toEqual(expectedResult);
    });

    it('should handle data without categories', () => {
        const mockSearchData = {
            filters: [], // No categories
            results: [],
        };

        const expectedResult = {
            categories: [],
            items: [],
        };

        const result = searchTransformer(mockSearchData);
        expect(result).toEqual(expectedResult);
    });

    it('should handle data without results', () => {
        const mockSearchData = {
            filters: [
                {
                    id: 'category',
                    values: [
                        {
                            path_from_root: [
                                { name: 'Electronics' },
                                { name: 'Laptops' },
                            ],
                        },
                    ],
                },
            ],
            results: [], // No results
        };

        const expectedResult = {
            categories: [['Electronics', 'Laptops']],
            items: [],
        };

        const result = searchTransformer(mockSearchData);
        expect(result).toEqual(expectedResult);
    });

    it('should throw an error if `searchData` is not a valid object', () => {
        expect(() => searchTransformer(null)).toThrow(
            'Invalid data provided for transformation.'
        );
        expect(() => searchTransformer('invalid-data')).toThrow(
            'Invalid data provided for transformation.'
        );
    });

    it('should handle data with missing fields in the results', () => {
        const mockSearchData = {
            results: [
                {
                    id: '123',
                    title: 'Laptop',
                    sale_price: {}, // Missing price fields
                    thumbnail: 'http://example.com/laptop.jpg',
                    condition: 'new',
                    shipping: { free_shipping: true },
                },
            ],
        };

        const expectedResult = {
            categories: [],
            items: [
                {
                    id: '123',
                    title: 'Laptop',
                    price: {
                        currency: undefined,
                        amount: undefined,
                        decimals: undefined,
                    },
                    picture: 'http://example.com/laptop.jpg',
                    condition: 'new',
                    free_shipping: true,
                },
            ],
        };

        const result = searchTransformer(mockSearchData);
        expect(result).toEqual(expectedResult);
    });
});
