var express = require('express');
var router = express.Router();
const authen = require('../middleware/auth');
const order_controller = require('../models/order/orderController');
const notification_controller = require('../models/notification/notificationController');

const notification = require('../ultils/send-notifi');

//Tạo order
//https://itech-server-hiuntps.onrender.com/order/api/create-order
router.post('/api/add-order', [authen], async function (req, res, next) {
    try {
        const { dateCreate, datePayment, totalPrice, status, paymentMethod, address, idUser } = req.body;
        const order = await order_controller
            .add_order(dateCreate, datePayment, totalPrice, status, paymentMethod, address, idUser);
        //Gui thong bao den nguoi dung
        const notifi = {
            title: 'iTech - Order',
            body: `Order ${order._id} placed successfully.`,
            image: '',
            idSender: '',
            idReceiver: idUser
        }
        await notification_controller.onAddNotification(notifi);
        await notification.onSendData(idUser, notifi);
        res.json({ error: false, responeTime: new Date(), statusCode: 200, data: order });
    } catch (error) {
        res.json({ error: true, responeTime: new Date(), statusCode: 500, message: error.message });
    }
});

//Lấy order theo idUser
//https://itech-server-hiuntps.onrender.com/order/api/get-order-by-idUser/:idUser
router.get('/api/get-orders-by-idUser/:idUser', async function (req, res, next) {
    try {
        const { idUser } = req.params;
        const order = await order_controller.get_order_by_idUser(idUser);
        res.json({ error: false, responeTime: new Date(), statusCode: 200, data: order });
    } catch (error) {
        res.json({ error: true, responeTime: new Date(), statusCode: 500, message: error.message });
    }
});

//Cập nhật order
router.post('/api/update-order', [authen], async function (req, res, next) {
    try {
        const { _id, datePayment, status } = req.body;
        const order = await order_controller
            .update_order( _id, datePayment, status);
        res.json({ error: false, responeTime: new Date(), statusCode: 200, data: order });
    } catch (error) {
        res.json({ error: true, responeTime: new Date(), statusCode: 500, message: error.message });
    }
});

module.exports = router;
