const axios = require('axios');

const apiClient = axios.create({
  baseURL: process.env.MELI_API_URL || 'https://api.mercadolibre.com',
  timeout: 5000,
});

module.exports = apiClient;
