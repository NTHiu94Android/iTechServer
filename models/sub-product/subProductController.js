const sub_product_service = require('./subProductService');

//Lay subProducts theo idProduct
const onGetSubProductsByIdProduct = async () => {
    try {
        const subProducts = await sub_product_service.getSubProductsByIdProduct();
        return subProducts;
    } catch (error) {
        console.log('Error get products: ' + error.message);
    }
};

//Cap nhat subProduct
const onUpdateSubProduct = async () => {
    try {
        const subProduct = await sub_product_service.updateSubProduct(
            _id, price, description, quantity, color, sale,
            ram, rom, screen, cpu, pin, front_camera, back_camera, idProduct
        );
        return subProduct;
    } catch (error) {
        console.log('Error update product: ' + error.message);
    }
};

//Add subProduct
const onAddSubProduct = async () => {
    try {
        const subProduct = await sub_product_service.addProduct(
            price, description, quantity, color, sale,
            ram, rom, screen, cpu, pin, front_camera, back_camera, idProduct
        );
        return subProduct;
    } catch (error) {
        console.log('Error add product: ' + error.message);
    }
};

module.exports = {
    onGetSubProductsByIdProduct, onAddSubProduct, onUpdateSubProduct
};