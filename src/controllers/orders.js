const states = require('../constantes/states')
const { totalPrice } = require('../functions/totalPrice')
const { addAddress } = require('../middlewares/orders')
const { checkIdAddress, userAddress } = require('../repositories/address')
const { getAllOrders, userOrders, createOrder, checkIdOrder, updateOrder, newOrderState, deleteOrderDetail, getOrderDetails, modifytotalPrice } = require('../repositories/orders')
const { checkMethodName } = require('../repositories/paymentMethods')
const { checkIdProduct } = require('../repositories/products')

exports.orderList = async (req, res) => {
    const user = req.user
    if(user.admin === true){
        const allOrders = await getAllOrders()
        res.status(200).json({Orders: allOrders})
    } else {
        const orders = await userOrders(user.id)
        res.status(200).json({Orders: orders})
    }
}

exports.newOrder = async (req, res) => {
    
    const body = req.body
    const user_id = req.user.id
    const method = await checkMethodName(body.payment)
    const total = await totalPrice(body.details)
    // let address = await checkIdAddress(body.address_id)
    let address = req.address.id
    if(address == null){ 
        address = await UserAddress(user_id)
    }
    await createOrder(body, user_id, method.id, body.details, total, address.id)
    res.status(201).json({"mensaje":`Pedido agregado`})
    //VER PORQUE NO ME AGREGAR EL ID DE LA DIRECCION A LOS PEDIDOS, LUEGO HACER EL ENDPOINT PARA DESHABILITAR USERS
    //TERMINAR DE VER EL AGRESAR PEDIDOS CON EL ID DE LAS ADDRESS
}

exports.modifyOrder = async (req, res) => {
    const newData = req.body
    const idOrder = req.params.idOrder
    const user = req.user

    let address = await checkIdAddress(newData.address_id)
    const total = await totalPrice(newData.details)
    const method = await checkMethodName(newData.payment)
    await updateOrder(idOrder, address.id, total, method.id, newData.details)
    res.status(200).json({"mensaje":"Pedido actualizado"})
}

exports.modifyOrderState = async (req,res) => {
    const state = req.body.state
    const idOrder = parseInt(req.params.idOrder)
    let order = await checkIdOrder(idOrder)

    if(order.state === states.pendiente){
        res.status(400).json({"mensaje":"No puede modificar un pedido que no esta cerrado"})
    } else{
        await newOrderState(state, idOrder)
        res.status(200).json({"mensaje":`Estado modificado a ${state}`})
    }
}

exports.orderConfirmation = async (req, res) => {
    const idOrder = req.params.idOrder
    await newOrderState(states.confirmado, idOrder)
    res.status(200).json({"mensaje":"Estado modificado a confirmado, ya no lo puede modificar"}) 
}

exports.deleteOrderProducts = async (req, res) => {
    const idOrder = req.params.idOrder
    const idProduct = req.body.product_id
    await deleteOrderDetail(idOrder, idProduct)
    const details = await getOrderDetails(idOrder)
    const total = await totalPrice(details)
    await modifytotalPrice(idOrder, total)
    res.status(200).json({msg: "Producto eliminado de la orden"})
}
