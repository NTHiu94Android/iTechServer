const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notification_model = new Schema({
    title: { type: String },
    body: { type: String },
    image: { type: String },
    idSender: { type: String },
    idReceiver: { type: String },
    isCheck: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Notification', notification_model);