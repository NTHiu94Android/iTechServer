const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const review = new Schema({
    content: { type: String },
    rating: { type: Number },
    idUser: { type: String },
    idProduct: { type: String },
});

module.exports = mongoose.model('Review', review);