/**
 *
 *
 * @param {Object} searchData - Data from MercadoLibre API response
 * @returns {Object} - formatted results.
 */
const searchTransformer = (searchData) => {
  if (!searchData || typeof searchData !== 'object') {
    throw new Error('Invalid data provided for transformation.');
  }

  return {
    categories:
      searchData.filters
        ?.find((filter) => filter.id === 'category')
        ?.values?.map((value) =>
          value.path_from_root.map((category) => category.name)
        ) ?? [],
    items: (searchData.results || []).map((item) => ({
      id: item.id,
      title: item.title,
      price: {
        currency: item.sale_price.currency_id,
        amount: item.sale_price.amount,
        decimals: item.sale_price.decimals,
      },
      picture: item.thumbnail,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
    })),
  };
};

module.exports = searchTransformer;
