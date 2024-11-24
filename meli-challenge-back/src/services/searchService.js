const apiClient = require('../utils/apiClient');

/**
 *
 *
 * @param {string} query - Search Query
 * @returns {Object} - Api Response.
 */
async function fetchSearchResults(query) {
  try {
    const response = await apiClient.get('/sites/MLA/search', {
      params: { q: query, limit: 4 },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error al consultar el API externo');
  }
}

module.exports = { fetchSearchResults };
