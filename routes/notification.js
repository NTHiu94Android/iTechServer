const express = require('express');
const router = express.Router();
const notificationController = require('../models/notification/notificationController');

const authen = require('../middleware/auth');

//Lay tat ca notification theo idReceiver
router.get('/api/get-notification-by-idReceiver/:idReceiver', authen, async (req, res) => {
    try {
        const notifications = await notificationController.onGetNotificationByIdReceiver(req.params.idReceiver);
        res.json({ error: false, responeTime: new Date(), statusCode: 200, data: notifications });
    } catch (error) {
        res.json({ error: true, responeTime: new Date(), statusCode: 500, message: error.message });
    }
});

//Cap nhat notification da doc
router.post('/api/update-notification-isCheck', authen, async (req, res) => {
    try {
        const notification = await notificationController.onUpdateNotificationIsCheck(req.body._idNotification);
        res.json({ error: false, responeTime: new Date(), statusCode: 200, data: notification });
    } catch (error) {
        res.json({ error: true, responeTime: new Date(), statusCode: 500, message: error.message });
    }
});

//Xoa notification
router.get('/api/delete-notification/:_idNotification', authen, async (req, res) => {
    try {
        const notification = await notificationController.onDeleteNotification(req.params._idNotification);
        res.json({ error: false, responeTime: new Date(), statusCode: 200, data: notification });
    } catch (error) {
        res.json({ error: true, responeTime: new Date(), statusCode: 500, message: error.message });
    }
});

//Them notification
router.post('/api/add-notification', authen, async (req, res) => {
    try {
        const { title, body, image, idSender, idReceiver } = req.body;
        const notification = await notificationController.onAddNotification(
            title, body, image, idSender, idReceiver
        );
        res.json({ error: false, responeTime: new Date(), statusCode: 200, data: notification });
    } catch (error) {
        res.json({ error: true, responeTime: new Date(), statusCode: 500, message: error.message });
    }
});


module.exports = router;