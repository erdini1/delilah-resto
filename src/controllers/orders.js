const orders = require('../models/orders')
const productsModels = require('../models/products')
const users = require('../models/users')
const states = require('../constantes/states')

exports.orderList = (req, res) => {
    const idHeaders = parseInt(req.headers.id_user)
    user = users.find(element => element.id === idHeaders)
    if(user.rol === "admin"){
        res.status(200).json({"Pedidos":orders})
    } else{
        let userOrders = orders.filter(element => element.idUser == idHeaders)
        res.status(200).json({"Pedidos": userOrders})
    }
}

exports.newOrder = (req, res) => {
    
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
}

exports.modifyOrder = (req, res) => {
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
}

exports.modifyOrderState = (req,res) => {
    const state = req.body.state
    let order = req.order

    if(order.state === states.pendiente){
        res.status(400).json({"mensaje":"No puede modificar un pedido que no esta cerrado"})
    } else{
        order.state = state
        res.status(200).json({"mensaje":`Estado modificado a ${state}`})
    }
}

exports.orderConfirmation = (req, res) => {
    const idParams = req.params.idOrder
    let order = orders.find(element => element.idOrder == idParams)
    const indexOrder = orders.indexOf(order)
    orders[indexOrder].state = states.confirmado
    res.status(200).json({"mensaje":"Estado modificado a confirmado, ya no lo puede modificar"})
}