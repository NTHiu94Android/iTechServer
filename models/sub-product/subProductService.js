const sub_product_model = require('./subProductModel');

//Lay subProducts theo idProduct
const getSubProductsByIdProduct = async (_idProduct) => {
    const product = await sub_product_model.find({ idProduct: _idProduct });
    return product;
};

//Cap nhat subProduct
const updateSubProduct = async (
    _id, price, description, quantity, color, sale,
    ram, rom, screen, cpu, pin, front_camera, back_camera, idProduct
) => {
    const product = await sub_product_model.findByIdAndUpdate(_id, {
        price, description, quantity, color, sale, 
        ram, rom, screen, cpu, pin, front_camera, back_camera, idProduct
    });
    return product;
};

//Add subProduct
const addProduct = async (
    price, description, quantity, color, sale,
    ram, rom, screen, cpu, pin, front_camera, back_camera, idProduct
) => {
    const product = new sub_product_model({
        price, description, quantity, color, sale,
        ram, rom, screen, cpu, pin, front_camera, back_camera, idProduct
    });
    await product.save();
    return product;
};

module.exports = {
    getSubProductsByIdProduct, addProduct, updateSubProduct
};