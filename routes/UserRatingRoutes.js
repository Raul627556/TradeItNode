const express = require('express');
const UserRatingController = require('../controllers/UserRatingController');

const router = express.Router();

router.get('/', UserRatingController.getAll);
router.get('/:id', UserRatingController.getById);
router.post('/', UserRatingController.create);
router.put('/:id', UserRatingController.update);
router.delete('/:id', UserRatingController.remove);

module.exports = router;
