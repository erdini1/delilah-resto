const express = require('express')
const router = express.Router()
const paymentMethods  = require('../models/paymentMethods')
const middlesProducts = require('../middlewares/products')
const middlesPayments = require('../middlewares/paymentMethods')

//El admin puede ver el listado de metodos de pago
router.get('/', middlesProducts.validate_started_session, middlesProducts.validate_admin, (req, res) => {
    res.status(200).json({"Metodos de pago": paymentMethods})
})

//El admin puede agregar un metodo de pago
router.post('/', middlesProducts.validate_started_session, middlesProducts.validate_admin, (req, res) => {
    let newMethod = req.body
    if(newMethod.method != undefined && newMethod.method != ""){
        let paymentMethodFind = paymentMethods.find(element => element.method === newMethod.method)
        if(!paymentMethodFind){
            if((paymentMethods[paymentMethods.length - 1]) != undefined){
                newMethod.id = paymentMethods[paymentMethods.length - 1].id + 1 
            } else{
                newMethod.id = 1
            }
            paymentMethods.push(newMethod)
            res.status(201).json({"mensaje":"Metodo de pago agregado"})
        } else{
            res.status(400).json({"mensaje":"El metodo de pago ya existe"})
        }
    }else{
        res.status(400).json({"mensaje":"No puede dejar el campo de metodo vacio"})
    }
    
})

//El admin puede modificar un metodo de pago con el id pasado por parametro
router.put('/:idPayment', middlesProducts.validate_started_session, middlesProducts.validate_admin, middlesPayments.validate_id_payment, (req, res) => {
    let paymentMethodFind = paymentMethods.find(element => element.id == parseInt(req.params.idPayment)) 
    let indexPaymentMethod = paymentMethods.indexOf(paymentMethodFind)
    let newPayment = req.body.method
    paymentMethods[indexPaymentMethod].method = newPayment
    res.status(200).json({"mensaje": `Metodo de pago modificado a ${newPayment}`})
})

//El admin puede eliminar un metodo de pago con el id pasado por pareametro
router.delete('/:idPayment', middlesProducts.validate_started_session, middlesProducts.validate_admin, middlesPayments.validate_id_payment, (req, res) => {
    let paymentMethodFind = paymentMethods.find(element => element.id == parseInt(req.params.idPayment)) 
    let indexPaymentMethod = paymentMethods.indexOf(paymentMethodFind)
    paymentMethods.splice(indexPaymentMethod, 1)
    res.status(200).json({"mensaje":"Metodo de pago eliminado"})
})

module.exports = router