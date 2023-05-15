const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const promotion_model = new Schema({
  content: { type: String },
  sale: { type: Number },
  code: { type: String },
  expirationDate: { type: Date },
  condition: { type: Number },
  idUser: { type: String },
});

module.exports = mongoose.model('Promotion', promotion_model);