const express = require('express');
const SearchHistoryController = require('../controllers/SearchHistoryController');

const router = express.Router();

router.get('/', SearchHistoryController.getAll);
router.get('/:id', SearchHistoryController.getById);
router.post('/', SearchHistoryController.create);
router.put('/:id', SearchHistoryController.update);
router.delete('/:id', SearchHistoryController.remove);

module.exports = router;
