const express = require('express');
const router = express.Router();
const address_controller = require('../models/address/addressController');

const authen = require('../middleware/auth');

//Lay address theo idUser
//https://itech-server-hiuntps.onrender.com/address/api/get-address-by-idUser/:idUser
router.get('/api/get-address-by-idUser/:idUser', [authen], async function (req, res, next) {
    try {
        const { idUser } = req.params;
        const listAddress = await address_controller.get_address_by_idUser(idUser);
        res.json({ error: false, responeTime: new Date(), statusCode: 200, data: listAddress });
    } catch (error) {
        res.json({ error: true, responeTime: new Date(), statusCode: 500, message: error.message });
    }
});

//Them address
//https://itech-server-hiuntps.onrender.com/address/api/add-address
router.post('/api/add-address', [authen], async function (req, res, next) {
    try {
        const { body, status, numberPhone, idUser } = req.body;
        const address = await address_controller.add_address(body, status, numberPhone, idUser);
        res.json({ error: false, responeTime: new Date(), statusCode: 200, data: address });
    } catch (error) {
        res.json({ error: true, responeTime: new Date(), statusCode: 500, message: error.message });
    }
});

//Cap nhat address
//https://itech-server-hiuntps.onrender.com/address/api/update-address
router.post('/api/update-address', [authen], async function (req, res, next) {
    try {
        const { _id, body, status, numberPhone, idUser } = req.body;
        const address = await address_controller.update_address(_id, body, status, numberPhone, idUser);
        res.json({ error: false, responeTime: new Date(), statusCode: 200, data: address });
    } catch (error) {
        res.json({ error: true, responeTime: new Date(), statusCode: 500, message: error.message });
    }
});

//Xoa address
//https://itech-server-hiuntps.onrender.com/address/api/delete-address
router.get('/api/delete-address/:_id', [authen], async function (req, res, next) {
    try {
        const { _id } = req.params;
        const address = await address_controller.delete_address(_id);
        res.json({ error: false, responeTime: new Date(), statusCode: 200, data: address });
    } catch (error) {
        res.json({ error: true, responeTime: new Date(), statusCode: 500, message: error.message });
    }
});

module.exports = router;