//const orders = require('../models/orders')
const productsModels = require('../models/products')
const users = require('../models/users')
const states = require('../constantes/states')
const { getAllOrders, userOrders, createOrder, getTotalPrice, checkIdOrder, updateOrder, newOrderState } = require('../repositories/orders')
const { checkIdUser } = require('../repositories/users')
const { checkMethodName } = require('../repositories/paymentMethods')
const { Order } = require('../modelsdb/orders')
const { checkIdProduct } = require('../repositories/products')
// const { checkIdMethod } = require('../repositories/paymentMethods')

exports.orderList = async (req, res) => {
    const idHeaders = parseInt(req.headers.id_user)
    const user = req.user
    if(user.admin === true){
        const allOrders = await getAllOrders()
        res.status(200).json({Orders: allOrders})
    } else {
        const orders = await userOrders(idHeaders)
        res.status(200).json({Orders: orders})
    }
}

exports.newOrder = async (req, res) => {
    
    const body = req.body
    const user_id = parseInt(req.headers.id_user)
    const method = await checkMethodName(body.payment)
    let totalPrice = 0;

    for await (product of body.details){
        let productFind = await checkIdProduct(product.product_id)
        if(productFind){
            totalPrice += (parseInt(productFind.toJSON().price)*parseInt(product.amount))
        }
    }
    let address = req.body.newAddress
    if(body.newAddress == undefined){ 
        address = req.user.address
    }
    
    const order = await createOrder(body, user_id, method.id, body.details, totalPrice, address)
    res.status(201).json({"mensaje":`Pedido agregado`})
}

exports.modifyOrder = async (req, res) => {
    const newData = req.body
    const idOrder = req.params.idOrder
    const orderFind = await checkIdOrder(idOrder)
    let address
    if(newData.newAddress != undefined){ 
        address = newData.newAddress
    }
    let totalPrice = 0;
    for await (product of newData.details){
        let productFind = await checkIdProduct(product.product_id)
        if(productFind){
            totalPrice += (parseInt(productFind.toJSON().price)*parseInt(product.amount))
        }
    }
    const method = await checkMethodName(newData.payment)
    const order = await updateOrder(idOrder, address, totalPrice, method.id, newData.details)
    
    if(newData.details.lenght != orderFind.details.lenght){
        //VER DE ELIMINAR PRODUCTOS EN UNA MODIFICACION, PODRIA ENCARARLO DESDE EL ID DEL PRODUCTO
    }

    res.status(200).json({"mensaje":"Pedido actualizado"})
}

exports.modifyOrderState = async (req,res) => {
    const state = req.body.state
    const idOrder = parseInt(req.params.idOrder)
    let order = await checkIdOrder(idOrder)

    if(order.state === states.pendiente){
        res.status(400).json({"mensaje":"No puede modificar un pedido que no esta cerrado"})
    } else{
        const modifyState = newOrderState(state, idOrder)
        res.status(200).json({"mensaje":`Estado modificado a ${state}`})
    }
}

exports.orderConfirmation = (req, res) => {
    const idParams = req.params.idOrder
    const modifyState = newOrderState(states.confirmado, idParams)
    res.status(200).json({"mensaje":"Estado modificado a confirmado, ya no lo puede modificar"}) 
}