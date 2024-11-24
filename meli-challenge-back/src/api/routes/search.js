const express = require('express');
const { searchController } = require('../controllers/searchController');

const router = express.Router();

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Make a search on MercadoLibre API
 *     description: Query the MercadoLibre API and return the formatted results.
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: Search
 *     responses:
 *       200:
 *         description: List Results
 *         content:
 *           application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   author:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       lastname:
 *                         type: string
 *                   categories:
 *                     type: array
 *                     items:
 *                       type: string
 *                   items:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         title:
 *                           type: string
 *                         price:
 *                           type: object
 *                           properties:
 *                             currency:
 *                               type: string
 *                             amount:
 *                               type: number
 *                             decimals:
 *                               type: number
 *                         picture:
 *                           type: string
 *                         condition:
 *                           type: string
 *                         free_shipping:
 *                           type: boolean
 *       400:
 *         description: Required parameters are missing
 *       500:
 *         description: Internal server error
 */
router.get('/items', searchController);

module.exports = router;
