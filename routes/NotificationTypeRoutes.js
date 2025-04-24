const express = require('express');

const NotificationTypeController = require('../controllers/NotificationTypeController');
const router = express.Router();

router.get('/', NotificationTypeController.getAll);
router.get('/:id', NotificationTypeController.getById);
router.post('/', NotificationTypeController.create);
router.put('/:id', NotificationTypeController.update);
router.delete('/:id', NotificationTypeController.remove);

module.exports = router;
