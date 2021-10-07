const paymentMethods = require('../models/paymentMethods')

function validate_id_payment(req, res, next){
    const idParams = parseInt(req.params.idPayment)
    const paymentMethod = paymentMethods.find(element => element.id == idParams)
    if(!Number.isInteger(idParams) || idParams == undefined){
        res.status(400).json({"mensaje" : "El id del metodo debe ser un numero entero"})

    }else{
        if(!paymentMethod){
            res.status(400).json({"mensaje":"El id indicado no pertenece a un metodo de pago"})
        } else{
            req.paymentMethod = paymentMethod
            next()
        }
    }
}

function validate_payment_method(req, res, next){
    let paymentMethod = req.body.payment
    let paymentFind = paymentMethods.find(element => element.method === paymentMethod)
    if(!paymentFind){
        res.status(400).json({
            "mensaje":`No ingreso un metodo de pago valido`,
            "Pruebe con ": paymentMethods
        })
    } else{
        next()
    }
}

module.exports = {
    validate_id_payment,
    validate_payment_method
}