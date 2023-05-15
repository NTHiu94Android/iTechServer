const express = require('express');
const router = express.Router();
const review_controller = require('../models/review/reviewController');

const authen = require('../middleware/auth');

//Them review
router.post('/add_review', authen, async (req, res) => {
    try {
        const review = await review_controller.add_review(
            req.body.content, req.body.rating, req.body.idUser, req.body.idProduct
        );
        res.json({ error: false, responeTime: new Date(), statusCode: 200, data: review });
    } catch (error) {
        res.json({ error: true, responeTime: new Date(), statusCode: 500, message: error.message });
    }
});

//Lay review theo idProduct
router.get('/get_review_by_idProduct/:idProduct', authen, async (req, res) => {
    try {
        const { idProduct } = req.params;
        const review = await review_controller.get_review_by_idProduct(idProduct);
        res.json({ error: false, responeTime: new Date(), statusCode: 200, data: review });
    } catch (error) {
        res.json({ error: true, responeTime: new Date(), statusCode: 500, message: error.message });
    }
});

module.exports = router;