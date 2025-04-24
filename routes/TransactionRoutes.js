const express = require('express');
const TransactionController = require('../controllers/TransactionController');

const router = express.Router();

router.get('/', TransactionController.getAll);
router.get('/:id', TransactionController.getById);
router.post('/', TransactionController.create);
router.put('/:id', TransactionController.update);
router.delete('/:id', TransactionController.remove);

module.exports = router;
