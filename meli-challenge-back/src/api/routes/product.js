const express = require('express');
const { productController } = require('../controllers/productController');

const router = express.Router();

/**
 * @swagger
 * /items/:id:
 *   get:
 *     summary: Get Product details from MercadoLibre API
 *     description: Query the MercadoLibre API and return the formatted result.
 *     parameters:
 *       - in: Params
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product Details
 *     responses:
 *       200:
 *         description: Product Details
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
 *                     item:
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
 *                         sold_quantity:
 *                           type: number
 *                         free_shipping:
 *                           type: boolean
 *
 *       400:
 *         description: Required parameters are missing
 *       500:
 *         description: Internal server error
 */
router.get('/items/:id', productController);

module.exports = router;
