const apiClient = require('../utils/apiClient');

/**
 *
 *
 * @param {string} productId - Product ID
 * @returns {Object} - Api Response.
 */
async function fetchProduct(productId) {
  try {
    const response = await apiClient.get(`/items/${productId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error while querying the external API');
  }
}

/**
 *
 *
 * @param {string} productId - Product ID
 * @returns {Object} - Api Response.
 */
async function fetchProductDetails(productId) {
  try {
    const response = await apiClient.get(`/items/${productId}/description`);
    return response.data;
  } catch (error) {
    throw new Error('Error while querying the external API');
  }
}

module.exports = { fetchProduct, fetchProductDetails };
