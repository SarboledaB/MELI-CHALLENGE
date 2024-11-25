import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/items';

const productService = {
  async searchProducts(query) {
    try {
      const response = await axios.get(`${API_BASE_URL}?q=${query}&limit=4`);
      return response.data;
    } catch (error) {
      console.error('Error al buscar los productos:', error);
      throw error;
    }
  },

  async getProduct(productId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/${productId}`);
      return response.data;
    } catch (error) {
      console.error('Error al buscar los productos:', error);
      throw error;
    }
  },
};

export default productService;
