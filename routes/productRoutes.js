const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Ruta para crear un producto (POST /api/products)
router.post('/products', productController.createProduct);

module.exports = router;
