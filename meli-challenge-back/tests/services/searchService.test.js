const { fetchSearchResults } = require('../../src/services/searchService');
const apiClient = require('../../src/utils/apiClient');

// Mock apiClient
jest.mock('../../src/utils/apiClient');

describe('fetchSearchResults', () => {
    it('should return search data when the API responds successfully', async () => {
        const query = 'laptop';
        const mockResponse = {
            results: [{ id: '123', title: 'Laptop' }, { id: '456', title: 'Tablet' }],
        };

        // Simulate the API response
        apiClient.get.mockResolvedValue({ data: mockResponse });

        const result = await fetchSearchResults(query, 4);

        expect(apiClient.get).toHaveBeenCalledWith('/sites/MLA/search', {
            params: { q: query, limit: 4 },
        });
        expect(result).toEqual(mockResponse);
    });

    it('should throw an error when the API fails', async () => {
        const query = 'laptop';

        // Simulate an API error
        apiClient.get.mockRejectedValue(new Error('API Error'));

        await expect(fetchSearchResults(query, 4)).rejects.toThrow(
            'Error while querying the external API'
        );
        expect(apiClient.get).toHaveBeenCalledWith('/sites/MLA/search', {
            params: { q: query, limit: 4 },
        });
    });
});
