const express = require('express')
const router = express.Router()
const middlesProducts = require('../middlewares/products')
const middlesPayments = require('../middlewares/paymentMethods')
const { paymentList, newPayment, modifyPayment, deletePayment } = require('../controllers/paymentMethods')

//El admin puede ver el listado de metodos de pago
router.get('/', middlesProducts.validate_started_session, middlesProducts.validate_admin, paymentList)

//El admin puede agregar un metodo de pago
router.post('/', middlesProducts.validate_started_session, middlesProducts.validate_admin, middlesPayments.validate_payment_body, newPayment)

//El admin puede modificar un metodo de pago con el id pasado por parametro
router.put('/:idPayment', middlesProducts.validate_started_session, middlesProducts.validate_admin, middlesPayments.validate_id_payment, middlesPayments.validate_payment_body,modifyPayment)

//El admin puede eliminar un metodo de pago con el id pasado por pareametro
router.delete('/:idPayment', middlesProducts.validate_started_session, middlesProducts.validate_admin, middlesPayments.validate_id_payment, deletePayment)

module.exports = router