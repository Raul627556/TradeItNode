const express = require('express');
const TradeProposalController = require('../controllers/TradeProposalController');

const router = express.Router();

router.get('/', TradeProposalController.getAll);
router.get('/:id', TradeProposalController.getById);
router.post('/', TradeProposalController.create);
router.put('/:id', TradeProposalController.update);
router.delete('/:id', TradeProposalController.remove);

module.exports = router;
