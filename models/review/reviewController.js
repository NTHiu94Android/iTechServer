const reviewService = require('./reviewService');

//Them review
const add_review = async (req, res) => {
    try {
        const review = await reviewService.add_review(
            content, rating, idUser, idProduct
        );
        return review;
    } catch (error) {
        console.log("Error add review: " + error.message);
    }
};

//Lay review theo idProduct
const get_review_by_idProduct = async (idProduct) => {
    try {
        const review = await reviewService.get_review_by_idProduct(idProduct);
        return review;
    } catch (error) {
        console.log("Error get review by idProduct: " + error.message);
    }
};

module.exports = {
    add_review, get_review_by_idProduct,
};