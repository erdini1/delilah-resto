const express = require('express')
const router = express.Router()
const middlesProducts = require('../middlewares/products')
const middlesOrders = require('../middlewares/orders')
const middlesPayments = require('../middlewares/paymentMethods')
const { orderList, newOrder, modifyOrder, modifyOrderState, orderConfirmation, deleteOrderProducts } = require('../controllers/orders')
const { verify_disabled } = require('../middlewares/users')

//El admin puede ver todos los pedidos, El usuario puede ver sus pedidos
router.get('/', middlesProducts.validate_started_session, verify_disabled, orderList)

//El usuario puede realizar un pedido
router.post('/', middlesProducts.validate_started_session, verify_disabled, middlesOrders.validate_data_orders,  middlesPayments.validate_payment_method, middlesOrders.addAddress,  newOrder)

//El usuario puede modificar su pedido solo mientras el estado sea "pendiente"
router.put('/:idOrder', middlesProducts.validate_started_session, verify_disabled, middlesOrders.validate_id_order, middlesOrders.modify_order, middlesOrders.validate_data_orders, middlesPayments.validate_payment_method, middlesOrders.addAddress, modifyOrder)

//El admin puede modificar el estado del pedido solo si ya esta confirmado
router.put('/:idOrder/state', middlesProducts.validate_started_session, middlesProducts.validate_admin, middlesOrders.validate_id_order, middlesOrders.modify_states, middlesOrders.addAddress, modifyOrderState)

//El usuario puede confirmar su pedido
router.put('/:idOrder/confirmation', middlesProducts.validate_started_session, verify_disabled, middlesOrders.validate_id_order,  middlesOrders.modify_order, orderConfirmation)

//El usuario puede eliminar productos de su orden mientras el estado sea "pendiente"
router.delete('/:idOrder',middlesProducts.validate_started_session, verify_disabled, middlesOrders.validate_id_order, middlesOrders.modify_order,  deleteOrderProducts)

// //El ususario puede agregar un producto a su orden mientras el estado se "pendiente"
// router.post('/:idOrder',middlesProducts.validate_started_session, middlesOrders.validate_id_order, middlesOrders.modify_order,  postOrderProducts)

module.exports = router

