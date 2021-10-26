const paymentMethods = require('../models/paymentMethods');
const { Order, OrderDetail } = require('../modelsdb/orders');
const { checkIdProduct } = require('./products');
const states = require('../constantes/states');
const { Product } = require('../modelsdb/products');

exports.getAllOrders = async () => {
    return await Order.findAll({
        include: {
            model: OrderDetail,
            as: "OrderDetails",
            attributes: ["amount", "product_id"]
        }
    })
}

exports.userOrders = async (idUser) => {
    return await Order.findAll({
        where: {
            user_id: idUser
        }, 
        include: {
            model: OrderDetail,
            as: "OrderDetails",
            attributes: ["amount", "product_id"]
        }
    })
}

exports.createOrder = async (body, idUser, idPayment, details, totalPrice, address) => {
    const newOrder = await Order.create(
        {
            newAddress: address,
            total: totalPrice,
            user_id: idUser,
            payment_id: idPayment,
            state: states.pendiente
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

exports.updateOrder = async (idOrder, address, totalPrice, idPayment, details) => {
    const modifyOrder = await Order.update({
        newAddress: address,
        total: totalPrice,
        payment_id: idPayment,
    }, {
        where: {
            id: idOrder
        }       //SEGUIR MIRANDO EL TEMA DEL UPDATE
    })

    const products = details.map(async element =>  {
        let orderDetailsUpdate = await OrderDetail.update(
            {
                amount: element.amount,
                product_id: element.product_id
            }, {
                where: {
                    product_id: element.product_id
                }
            }
        )
    })
    return modifyOrder
}

exports.checkIdOrder = async (id) => {
    return await Order.findOne({
        where: {
            id: id
        },
        include: {
            model: OrderDetail,
            as: "OrderDetails",
            attributes: ["amount", "product_id"]
        }
    })
}

exports.newOrderState = async (newState, idOrder) => {
    return await Order.update({
        state: newState
    }, {
        where: {
            id: idOrder
        }
    })
}