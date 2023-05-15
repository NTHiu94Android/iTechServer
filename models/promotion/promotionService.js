const promotion_model = require('./promotionModel');

//Lay tat ca promotion theo idUser
const getAllPromotionByIdUser = async (idUser) => {
    const promotions = await promotion_model.find({ idUser: idUser });
    return promotions;
};

//Them moi promotion
const addPromotion = async (content, sale, code, expirationDate, condition, idUser) => {
    const promotion = new promotion_model({
        content, sale, code, expirationDate, condition, idUser
    });
    await promotion.save();
    return promotion;
};

//Xoa promotion
const deletePromotion = async (_id) => {
    const promotion = await promotion_model.findByIdAndDelete(_id);
    return promotion;
};

module.exports = {
    getAllPromotionByIdUser, addPromotion, deletePromotion
}