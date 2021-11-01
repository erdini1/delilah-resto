const paymentMethods = require('../models/paymentMethods');
const { Order, OrderDetail } = require('../modelsdb/orders');
const states = require('../constantes/states');

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
            address_id: address,
            total: totalPrice,
            user_id: idUser,
            payment_id: idPayment,
            state: states.pendiente
        }
    )
    const newOrderId = await newOrder.id

    const products = details.map(async element =>  {
        await OrderDetail.create(
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
        address_id: address,
        total: totalPrice,
        payment_id: idPayment,
    }, {
        where: {
            id: idOrder
        }
    })

    for await (product of details){
        await OrderDetail.update(
            {
                amount: product.amount
            }, {
                where: {
                    product_id: product.product_id,
                    order_id: idOrder
                }
            })
    }
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

exports.getOrderDetails = async (idOrder) => {
    return await OrderDetail.findAll({
        where: {
            order_id: idOrder
        }
    })
}

exports.deleteOrderDetail = async (idOrder, idProduct) => {
    return await OrderDetail.destroy({
        where: {
            order_id: idOrder,
            product_id: idProduct
        }
    })
}

exports.modifytotalPrice = async (idOrder, total) => {
    return await Order.update({
        total: total
    }, {
        where: {
            id: idOrder
        }
    })
}