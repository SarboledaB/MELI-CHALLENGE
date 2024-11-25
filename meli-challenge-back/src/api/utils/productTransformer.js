/**
 *
 *
 * @param {Object} product - Data from MercadoLibre API response
 * @param {string} description - Data from MercadoLibre API response
 * @returns {Object} - formatted results.
 */
const productTransformer = (product, description) => {
  if (!product || typeof product !== 'object') {
    throw new Error('Invalid data provided for transformation.');
  }

  return {
    item: {
      id: product.id,
      title: product.title,
      price: {
        currency: product.currency_id,
        amount: product.price,
      },
      picture: product.pictures[0].url,
      condition: product.condition,
      free_shipping: product.shipping.free_shipping,
      sold_quantity: product.sold_quantity,
      description: description,
    },
  };
};

module.exports = productTransformer;
