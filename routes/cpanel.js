var express = require('express');
var router = express.Router();

const cloudinary = require('cloudinary').v2;
const multer = require('../middleware/multer');

const jwt = require("jsonwebtoken");

const user_controller = require('../models/user/userController');
const order_controller = require('../models/order/orderController');
const order_detail_controller = require('../models/order-detail/orderDetailController');
const product_controller = require('../models/product/productController');
const sub_product_controller = require('../models/sub-product/subProductController');
const category_controller = require('../models/category/categoryController');
const brand_controller = require('../models/brand/brandController');
const review_controller = require('../models/review/reviewController');
const address_controller = require('../models/address/addressController');
const picture_controller = require('../models/picture/pictureController');

const authen = require('../middleware/auth');

//---------------------------------Dang nhap---------------------------------
router.get('/', function (req, res, next) {
    res.render('login', { title: 'iTechPro - Admin login' });
});

router.post('/', async function (req, res, next) {
    try {
        const { username, password } = req.body;
        //username, email, password, fcmtoken
        const user = await user_controller.login(username, '', password, '');
        // const accessToken = jwt.sign({ user }, 'shhhhh', { expiresIn: 80 * 24 * 60 * 60 });
        // const refreshToken = jwt.sign({ user }, 'shhhhh', { expiresIn: 90 * 24 * 60 * 60 });
        if (!user) {
            res.status(401).render('Error', { message: 'Not authorization' });
            return;
        }
        if (user.role == 'admin') {
            res.redirect('home');
        } else {
            res.status(401).render('/', { message: 'Not authorization' });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//----------------------------------Trang chu----------------------------------
router.get('/home', function (req, res, next) {
    res.render('home', { title: 'iTechPro - Admin Dashboard' });
});

//-------------------Danh sach san pham---------------------------------------
router.get('/products', async function (req, res, next) {
    try {
        const products = await product_controller.onGetProducts();
        if (!products) {
            res.status(401).render('Error', { message: 'Not authorization' });
            return;
        }
        for (let i = 0; i < products.length; i++) {
            const subProducts = await sub_product_controller.onGetSubProductsByIdProduct(products[i]._id);
            products[i].subProducts = subProducts;
            products[i].price = subProducts[0].price;
            products[i].sale = subProducts[0].sale;
        }

        res.render('products', { title: 'iTechPro - Product', products: products });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//-------------------Cap nhat san pham---------------------------------------
router.get('/products/:_id/product-update', async function (req, res, next) {
    try {
        const products = await product_controller.onGetProducts();
        let product = null;
        if (!products) {
            res.status(401).render('Error', { message: 'Not authorization' });
            return;
        } else {
            for (let i = 0; i < products.length; i++) {
                if (products[i]._id == req.params._id) {
                    product = products[i];
                    break;
                }
            }
        }
        if (!product) {
            res.status(401).render('Error', { message: 'Not authorization' });
            return;
        }
        const subProducts = await sub_product_controller.onGetSubProductsByIdProduct(req.params.id);
        product.subProducts = subProducts;

        //Lay danh sach danh muc
        const categories = await category_controller.get_all_category();
        if (categories) {
            for (let i = 0; i < categories.length; i++) {
                if (categories[i]._id == product.idCategory) {
                    categories[i].isSelected = true;
                } else {
                    categories[i].isSelected = false;
                }
            }
        }

        //Lay danh sach thuong hieu
        const brands = await brand_controller.get_brand_by_id_category(product.idCategory);
        if (brands) {
            for (let i = 0; i < brands.length; i++) {
                if (brands[i]._id == product.idBrand) {
                    brands[i].isSelected = true;
                } else {
                    brands[i].isSelected = false;
                }
            }
        }
        const title = 'iTechPro - Product Update';
        res.render('product-update', { title, product, brands, categories });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/products/:_id/product-update', multer.single('image'), async function (req, res, next) {
    try {
        const { _id } = req.params;
        const { name, idCategory, idBrand } = req.body;
        const result = await cloudinary.uploader.upload(req.file.path);
        const image = result.secure_url;
        //console.log('Info: ', name, image, idCategory, idBrand);
        if (!name || !image || !idCategory || !idBrand) {
            res.status(401).render('Error', { message: 'Not authorization' });
            return;
        }
        const product = await product_controller.onUpdateProduct(_id, name, image, idCategory, idBrand);
        if (!product) {
            res.status(401).render('Error', { message: 'Not authorization' });
            return;
        }
        res.redirect('/products');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//-------------------Them san pham---------------------------------------
router.get('/products/product-insert', async function (req, res, next) {
    try {
        //Lay danh sach danh muc
        const categories = await category_controller.get_all_category();
        //console.log('categories: ', categories);
        //Lay danh sach thuong hieu
        let listBrands = [];
        if (categories) {
            for (let i = 0; i < categories.length; i++) {
                const brands = await brand_controller.get_brand_by_id_category(categories[i]._id);
                if (brands) {
                    for (let j = 0; j < brands.length; j++) {
                        listBrands.push(brands[j]);
                    }
                }
            }
        }
        const title = 'iTechPro - Product Add';
        res.render('product-insert', { title, categories, brands: listBrands });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/products/product-insert', multer.single('picture'), async function (req, res, next) {
    try {
        const {
            name, idCategory, idBrand, price, description, quantity, color, sale, ram, rom, cpu,
        } = req.body
        const result = await cloudinary.uploader.upload(req.file.path);
        const image = result.secure_url;
        const product = await product_controller.onAddroduct(name, image, idCategory, idBrand);
        const subProduct = await sub_product_controller
            .onAddSubProduct(price, description, quantity, color, sale, ram, rom, screen, cpu, "", "", "", product._id);
        await picture_controller.add_picture(image, subProduct._id, "", "");
        res.redirect('/products');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//-------------------------------------------San pham chi tiet-----------------------------------
router.get('/sub-product', async function (req, res, next) {
    try {
        const subProducts = await sub_product_controller.onGetSubProducts();
        if(subProducts){
            for (let i = 0; i < subProducts.length; i++) {
                const product = await product_controller.onGetProductById(subProducts[i].idProduct);
                if(product){
                    subProducts[i].nameProduct = product.name;
                    subProducts[i].image = product.image;
                }
            }

            res.render('sub-product', { title: 'iTechPro - Sub Product', subProducts });
            
        }else{
            res.status(401).render('Error', { message: 'Not authorization' });
            return;
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//-------------------------------------------Them san pham chi tiet-----------------------------------
router.get('/sub-products/sub-product-insert', multer.single('image'), async function (req, res, next) {
    try {
        const products = await product_controller.onGetProducts();
        if (products) {
            res.render('sub-product-insert', { title: 'iTechPro - Thêm sản phẩm chi tiết', products });
        } else {
            res.status(401).render('Error', { message: 'Not authorization' });
            return;
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//-------------------------------------------Cap nhat san pham chi tiet-------------------------------
router.get('/sub-products/:_id/sub-product-update', multer.single('image'), async function (req, res, next) {
    try {
        const { _id } = req.params;
        const subProducts = await sub_product_controller.onGetSubProducts();
        if (!subProducts) {
            return;
        }
        let subProduct = null;
        for (let i = 0; i < subProducts.length; i++) {
            if (subProducts[i]._id == _id) {
                subProduct = subProducts[i];
            }
        }

        const product = await product_controller.onGetProductById(subProduct.idProduct);
        //console.log('Product update subProduct', product);

        if (product) {
            res.render('sub-product-update', { title: 'iTechPro - Product', product, subProduct });
        } else {
            res.status(401).render('Error', { message: 'Not authorization' });
            return;
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/sub-products/:_id/sub-product-update', multer.array('pictures', 10), async function (req, res, next) {
    try {
        const {price, ram, rom, quantity, sale, cpu, screen, subProduct } = req.body;
        const { _id } = req.params;
        const files = req.files; // Danh sách các tệp đã được tải lên
        const result = await Promise.all(
            files.map(async (file) => {
                const uploadResult = await cloudinary.uploader.upload(file.path);
                return uploadResult.secure_url;
            })
        );
        console.log('Result', result);
        //Them hinh anh
        for (let i = 0; i < result.length; i++) {
            const picture = await picture_controller.add_picture(result[i], _id, "", "");
            console.log('Picture', picture);
        }
        //cap nhat subProduct
        const subProductUpdate = await sub_product_controller
            .onUpdateSubProduct(_id, price, subProduct.description, quantity, subProduct.color,
                sale, ram, rom, screen, cpu, subProduct.pin, "", "", subProduct.idProduct);

        if(!subProductUpdate){
            res.status(401).render('Error', { message: 'Not authorization' });
            return;
        }else{
            res.redirect('/products');
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/cpanel/delete-image', async function (req, res, next) {
    try {
        await picture_controller.deletePictures();
        res.json({data: true});
    } catch (error) {
        console.log(error);
    }
})


module.exports = router;