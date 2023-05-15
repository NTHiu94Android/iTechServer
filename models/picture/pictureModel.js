const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const picture_model = new Schema({
  url: { type: String },
  idProduct: { type: String },
  idReview: { type: String }
});

module.exports = mongoose.model('Picture', picture_model);