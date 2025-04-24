const express = require('express');
const UserChatController = require('../controllers/UserChatController');

const router = express.Router();

router.get('/', UserChatController.getAll);
router.get('/:id', UserChatController.getById);
router.post('/', UserChatController.create);
router.put('/:id', UserChatController.update);
router.delete('/:id', UserChatController.remove);

module.exports = router;
