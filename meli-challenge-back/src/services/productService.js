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
    throw new Error('Error al consultar el API externo');
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
    throw new Error('Error al consultar el API externo');
  }
}

module.exports = { fetchProduct, fetchProductDetails };
