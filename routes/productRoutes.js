const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Ruta para crear un producto (POST /api/products)
// GET /api/products - Obtener todos los productos
router.get('/', productController.getAllProducts);

// GET /api/products/:id - Obtener un producto por ID
router.get('/:id', productController.getProductById);

// POST /api/products - Crear un nuevo producto
router.post('/', productController.createProduct);

// PUT /api/products/:id - Actualizar completamente un producto
router.put('/:id', productController.updateProduct);

// PATCH /api/products/:id - Actualizar parcialmente un producto
router.patch('/:id', productController.partialUpdateProduct);

// DELETE /api/products/:id - Eliminar un producto
router.delete('/:id', productController.deleteProduct);

// Opcional: obtener productos de un usuario
router.get('/user/:userId', productController.getProductsByUser);

// Opcional: obtener productos por categoría
router.get('/category/:categoryId', productController.getProductsByCategory);

// Opcional: marcar como reservado
router.post('/:id/book', productController.bookProduct);

// Opcional: iniciar una solicitud de trueque
router.post('/:id/trade-request', productController.requestTrade);

module.exports = router;
