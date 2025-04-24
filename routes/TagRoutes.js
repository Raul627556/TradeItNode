const express = require('express');
const TagController = require('../controllers/TagController');

const router = express.Router();

router.get('/', TagController.getAll);
router.get('/:id', TagController.getById);
router.post('/', TagController.create);
router.put('/:id', TagController.update);
router.delete('/:id', TagController.remove);

module.exports = router;
