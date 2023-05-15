const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const order_detail_model = new Schema({
  quantity: { type: Number },
  idOrder: { type: String },
  idProduct: { type: String },
});

module.exports = mongoose.model('OrderDetail', order_detail_model);