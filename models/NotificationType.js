const mongoose = require('mongoose');

const NotificationTypeSchema = new mongoose.Schema({
  name: String,
  description: String
});

module.exports = mongoose.model('NotificationType', NotificationTypeSchema);
