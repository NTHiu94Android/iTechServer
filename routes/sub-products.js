var express = require('express');
var router = express.Router();
const sub_product_controller = require('../models/sub-product/subProductController');

const authen = require('../middleware/auth');

//----------------------Api-----------------------------------------
//Lay subProducts theo idProduct
router.get('/api/getSubProductsByIdProduct', [authen], async (req, res) => {
    try {
        const subProducts = await sub_product_controller.onGetSubProductsByIdProduct();
        res.json({ error: false, responeTime: new Date(), statusCode: 200, data: subProducts });
    } catch (error) {
        console.log('Error get products: ' + error.message);
    }
});

//----------------------Admin cpanel (res.render)-----------------------------------------
//Cap nhat subProduct
router.post('/cpanel/updateSubProduct', [authen], async (req, res) => {
    try {
        const {
            _id, price, description, quantity, color, sale,
            ram, rom, screen, cpu, pin, front_camera, back_camera, idProduct
        } = req.body;
        const subProduct = await sub_product_controller.onUpdateSubProduct(
            _id, price, description, quantity, color, sale,
            ram, rom, screen, cpu, pin, front_camera, back_camera, idProduct
        );
        res.json({ error: false, responeTime: new Date(), statusCode: 200, data: subProduct });
    } catch (error) {
        console.log('Error update product: ' + error.message);
    }
});

//Add subProduct
router.post('/cpanel/addProduct', [authen], async (req, res) => {
    try {
        const {
            price, description, quantity, color, sale,
            ram, rom, screen, cpu, pin, front_camera, back_camera, idProduct
        } = req.body;
        const subProduct = await sub_product_controller.onAddSubProduct(
            price, description, quantity, color, sale,
            ram, rom, screen, cpu, pin, front_camera, back_camera, idProduct
        );
        res.json({ error: false, responeTime: new Date(), statusCode: 200, data: subProduct });
    } catch (error) {
        console.log('Error add product: ' + error.message);
    }
});



module.exports = router;
