const { fetchSearchResults } = require('../../services/searchService');
const searchTransformer = require('../utils/searchTransformer');

async function searchController(req, res, next) {
  try {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({ error: 'Required parameters are missing' });
    }

    const results = await fetchSearchResults(query);
    const transformedData = searchTransformer(results);
    res.json(transformedData);
  } catch (error) {
    next(error);
  }
}

module.exports = { searchController };
