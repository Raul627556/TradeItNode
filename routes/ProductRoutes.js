const express = require('express');
const ProductController = require('../controllers/ProductController');
const router = express.Router();
const { verifyJWT }    = require('../middleware/verifyJWT');

router.get('/', ProductController.getAll);
router.get('/:id', ProductController.getById);
router.post('/', verifyJWT, ProductController.create);
router.put('/:id',verifyJWT, ProductController.update);
router.delete('/:id', verifyJWT ,ProductController.remove);

module.exports = router;

