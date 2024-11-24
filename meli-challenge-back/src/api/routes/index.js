const express = require('express');
const searchRoutes = require('./search');
const productRoutes = require('./product');

const router = express.Router();

router.use(searchRoutes);
router.use(productRoutes);

module.exports = router;
