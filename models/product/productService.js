const product_model = require('../product/productModel');
const sub_product_model = require('../sub-product/subProductModel');
const sub_product_controller = require('../sub-product/subProductController');

//Lay tat ca product
const getProducts = async () => {
    const products = await product_model.find();
    return products;
};

//Add product
const add_product = async (name, image, idCategory, idBrand) => {
    const product = new product_model({ name, image, idCategory, idBrand });
    await product.save();
    return product;
};

//Cap nhat san pham
const update_product = async (_id, name, image, idCategory, idBrand) => {
    const product = await product_model.findById(_id);
    product.name = name;
    product.image = image;
    product.idCategory = idCategory;
    product.idBrand = idBrand;
    await product.save();
    return product;
};

//Cap nhat ngay cua san pham
const update_date_product = async (_id) => {
    const product = await product_model.findById(_id);
    product.dateInput = Date.now();
    await product.save();
    return product;
};

//Xoa san pham
const delete_product = async (_id) => {
    const product = await product_model.findByIdAndDelete(_id);
    //Xoa tat ca sub product cua san pham
    await sub_product_model.deleteMany({ idProduct: _id });
    if(product){
        return true;
    }
    return false;
};

const update_sub_product = async (_id) => {
    const product = await product_model.findById(_id);
    //Xoa tat ca sub product cua san pham
    //await sub_product_model.deleteMany({ idProduct: _id });
    //Cap nhat lai so luong sub product ve 0
    const subProducts = await sub_product_model.find({ idProduct: _id });
    for (let i = 0; i < subProducts.length; i++) {
        await sub_product_controller.onUpdateQuantitySubProduct(subProducts[i]._id, 0);
    }
    if(product){
        return true;
    }
    return false;
};

module.exports = { 
    add_product, getProducts, update_product, delete_product, update_date_product, update_sub_product
};