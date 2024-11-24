const {
  fetchProduct,
  fetchProductDetails,
} = require('../../services/productService');
const productTransformer = require('../utils/productTransformer');

async function productController(req, res, next) {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(400).json({ error: 'Required parameters are missing' });
    }
    const product = await fetchProduct(productId);
    const productDescription = await fetchProductDetails(productId);
    const transformedData = productTransformer(
      product,
      productDescription.plain_text
    );
    res.json(transformedData);
  } catch (error) {
    next(error);
  }
}

module.exports = { productController };
