const express = require('express');
const router = express.Router();

router.use('/products', require('./ProductRoutes'));
router.use('/users', require('./UserRoutes'));
router.use('/categories', require('./CategoryRoutes'));
router.use('/tags', require('./TagRoutes'));
router.use('/notifications', require('./NotificationRoutes'));
router.use('/notification-types', require('./NotificationTypeRoutes'));
router.use('/transactions', require('./TransactionRoutes'));
router.use('/ratings', require('./UserRatingRoutes'));
router.use('/search-history', require('./SearchHistoryRoutes'));
router.use('/chats', require('./UserChatRoutes'));
router.use('/trades', require('./TradeProposalRoutes'));
router.use('/authentication', require('./AuthenticationRoutes'));

module.exports = router;

