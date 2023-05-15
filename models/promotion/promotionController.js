const promotion_service = require('./promotionService');

//Lay tat ca promotion theo idUser
const getAllPromotionByIdUser = async (idUser) => {
    try {
        const promotions = await promotion_service.getAllPromotionByIdUser(idUser);
        return promotions;
    } catch (error) {
        console.log('Get all promotion by id user error: ', error);
    }
};

//Them moi promotion
const addPromotion = async (content, sale, code, expirationDate, condition, idUser) => {
    try {
        const promotion = await promotion_service.addPromotion(content, sale, code, expirationDate, condition, idUser);
        return promotion;
    } catch (error) {
        console.log('Add promotion error: ', error);
    }

};

//Xoa promotion
const deletePromotion = async (_id) => {
    try {
        const promotion = await promotion_service.deletePromotion(_id);
        return promotion;
    } catch (error) {
        console.log('Delete promotion error: ', error);
    }
};

module.exports = {
    getAllPromotionByIdUser, addPromotion, deletePromotion
};