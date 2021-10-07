const express = require('express')
const router = express.Router()
const users = require('../models/users')
const middlesProducts = require('../middlewares/products')
const middlesOrders = require('../middlewares/orders')
const middlesPayments = require('../middlewares/paymentMethods')
const orders = require('../models/orders')
const productsModels = require('../models/products')
const states = require('../constantes/states')

//El admin puede ver todos los pedidos, El usuario puede ver sus pedidos
router.get('/', middlesProducts.validate_started_session, (req, res) => {
    const idHeaders = parseInt(req.headers.id_user)
    user = users.find(element => element.id === idHeaders)
    if(user.rol === "admin"){
        res.status(200).json({"Pedidos":orders})
    } else{
        let userOrders = orders.filter(element => element.idUser == idHeaders)
        res.status(200).json({"Pedidos": userOrders})
    }
})

//El usuario puede realizar un pedido
router.post('/', middlesProducts.validate_started_session, middlesOrders.validate_data_orders, middlesPayments.validate_payment_method, (req, res) => {
    
    let order = req.body
    let user = users.find(element => element.id === parseInt(req.headers.id_user))
    let totalPrice = 0
    let i = 0
    order.detail.forEach(productDetail => {
        let productFind = productsModels.find(element => element.id == productDetail.idProduct)
        if(productFind){
            totalPrice = totalPrice + (parseInt(productFind.price)*parseInt(order.detail[i].amount))
            i++;
        }
    })
    order.total = totalPrice
    order.state = states.pendiente
    order.address = order.newAddress
    if(order.address == undefined){
        order.address = user.address
    }
    order.hour = "12:00"
    order.idOrder = orders[orders.length - 1].idOrder + 1
    order.idUser = req.headers.id_user

    orders.push(order)

    res.status(201).json({"mensaje":`Pedido agregado`})

})

//El usuario puede modificar su pedido solo mientras el estado sea "pendiente"
router.put('/:idOrder', middlesProducts.validate_started_session, middlesOrders.validate_id_order, middlesOrders.modify_order, middlesOrders.validate_data_orders, middlesPayments.validate_payment_method, (req, res) => {
    let newData = req.body
    let idParams = req.params.idOrder
    let order = orders.find(element => element.idOrder == idParams)
    order.detail = newData.detail
    order.payment = newData.payment
    let totalPrice = 0
    let i = 0
    order.detail.forEach(productDetail => {
        let productFind = productsModels.find(element => element.id == productDetail.idProduct)
        if(productFind){
            totalPrice = totalPrice + (parseInt(productFind.price)*parseInt(order.detail[i].amount))
            i++;
        }
    })
    order.total = totalPrice
    order.address = newData.address
    order.hour = "12:40"
    res.status(200).json({"mensaje":"Pedido actualizado"})
})

//El admin puede modificar el estado del pedido solo si ya esta confirmado
router.put('/:idOrder/state', middlesProducts.validate_started_session, middlesProducts.validate_admin,  middlesOrders.validate_id_order, middlesOrders.modify_states, (req,res) => {
    const state = req.body.state
    let order = req.order

    if(order.state === states.pendiente){
        res.status(400).json({"mensaje":"No puede modificar un pedido que no esta cerrado"})
    } else{
        order.state = state
        res.status(200).json({"mensaje":`Estado modificado a ${state}`})
    }
    
})

//El usuario puede confirmar su pedido
router.put('/:idOrder/confirmation', middlesProducts.validate_started_session, middlesOrders.validate_id_order, middlesOrders.modify_order, (req, res) => {
    const idParams = req.params.idOrder
    let order = orders.find(element => element.idOrder == idParams)
    const indexOrder = orders.indexOf(order)
    orders[indexOrder].state = states.confirmado
    res.status(200).json({"mensaje":"Estado modificado a confirmado, ya no lo puede modificar"})
})

module.exports = router

