const express = require('express');
const NotificationController = require('../controllers/NotificationController');

const router = express.Router();

router.get('/', NotificationController.getAll);
router.get('/:id', NotificationController.getById);
router.post('/', NotificationController.create);
router.put('/:id', NotificationController.update);
router.delete('/:id', NotificationController.remove);

module.exports = router;
