const apiClient = require('../utils/apiClient');

/**
 *
 *
 * @param {string} query - Search Query
 * @param {number} limit - Search limit of products
 * @returns {Object} - Api Response.
 */
async function fetchSearchResults(query, limit) {
  try {
    const response = await apiClient.get('/sites/MLA/search', {
      params: { q: query, limit: limit },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error while querying the external API');
  }
}

module.exports = { fetchSearchResults };
