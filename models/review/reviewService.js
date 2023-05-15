const reviewModel = require('./reviewModel');

//Them review
const add_review = async (content, rating, idUser, idProduct) => {
    const review = new reviewModel({
        content: content,
        rating: rating,
        idUser: idUser,
        idProduct: idProduct
    });
    const result = await review.save();
    return result;
};

//Lay review theo idProduct
const get_review_by_idProduct = async (idProduct) => {
    const result = await reviewModel.find({ idProduct: idProduct });
    return result;
};

module.exports = {
    add_review, get_review_by_idProduct,
};