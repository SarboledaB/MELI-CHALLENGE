const { searchController } = require('../../src/api/controllers/searchController');
const { fetchSearchResults } = require('../../src/services/searchService');
const searchTransformer = require('../../src/api/utils/searchTransformer');

// Mock dependencies
jest.mock('../../src/services/searchService');
jest.mock('../../src/api/utils/searchTransformer');

describe('searchController', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            query: { q: 'example query' }, // Simulate a query string
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });

    it('should return a 400 error if the query parameter is missing', async () => {
        req.query.q = undefined; // Simulate a request without query
        await searchController(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Required parameters are missing' });
    });

    it('should return correctly transformed data', async () => {
        const mockResults = [{ id: 1, title: 'Result 1' }, { id: 2, title: 'Result 2' }];
        const mockTransformedData = [{ id: 1, name: 'Result 1' }, { id: 2, name: 'Result 2' }];

        fetchSearchResults.mockResolvedValue(mockResults);
        searchTransformer.mockReturnValue(mockTransformedData);

        await searchController(req, res, next);

        expect(fetchSearchResults).toHaveBeenCalledWith('example query');
        expect(searchTransformer).toHaveBeenCalledWith(mockResults);
        expect(res.json).toHaveBeenCalledWith(mockTransformedData);
    });

    it('should handle errors and call next', async () => {
        const mockError = new Error('Service error');
        fetchSearchResults.mockRejectedValue(mockError);

        await searchController(req, res, next);

        expect(next).toHaveBeenCalledWith(mockError);
    });
});
