const order_service = require('../order/orderService');

//Lay order theo idUser
const get_order_by_idUser = async (_idUser) => {
    try {
        const orders = await order_service.get_order_by_idUser(_idUser);
        return orders;
    } catch (error) {
        console.log('Error get order by idUser: ' + error.message);
    }
};

// add order
const add_order = async (orderDate, totalPrice, status, quantity, idUser) => {
    try {
        const order = await order_service
            .add_order(orderDate, totalPrice, status, quantity, idUser);
        return order;
    } catch (error) {
        console.log('Error add order: ' + error.message);
    }
};

//update order
const update_order = async (_id, orderDate, totalPrice, status, quantity, idUser) => {
    try {
        const order_update = await order_service
            .update_order(_id, orderDate, totalPrice, status, quantity, idUser);
        return order_update;
    } catch (error) {
        console.log('Error update order: ' + error.message);
    }
};

module.exports = {
    add_order, get_order_by_idUser, update_order,
};