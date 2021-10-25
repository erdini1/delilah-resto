const paymentMethods = require('../models/paymentMethods');
const { Order, OrderDetail } = require('../modelsdb/orders');
const { checkIdProduct } = require('./products');

exports.getAllOrders = async () => {
    return await Order.findAll()
}

exports.userOrders = async (idUser) => {
    return await Order.findAll({
        where: {
            user_id: idUser
        }
    })
}

exports.createOrder = async (body, idUser, idPayment, details, totalPrice, address) => {
    const newOrder = await Order.create(
        {
            newAddress: address,
            total: totalPrice,
            user_id: idUser,        //revisarrrr
            payment_id: idPayment,
        }
    )
    const newOrderId = await newOrder.id

    const products = details.map(async element =>  {
        const orderDetailsCreate = await OrderDetail.create(
            {
                amount: element.amount,
                order_id: newOrderId,
                product_id: element.product_id
            }
        )
    })
    return newOrder
}
