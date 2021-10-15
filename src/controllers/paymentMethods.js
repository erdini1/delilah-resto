const paymentMethods = require("../models/paymentMethods");

exports.paymentList = (req, res) => {
    res.status(200).json({"Metodos de pago": paymentMethods})
}

exports.newPayment = (req, res) => {
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
    
}

exports.modifyPayment = (req, res) => {
    let paymentMethodFind = paymentMethods.find(element => element.id == parseInt(req.params.idPayment)) 
    let indexPaymentMethod = paymentMethods.indexOf(paymentMethodFind)
    let newPayment = req.body.method
    paymentMethods[indexPaymentMethod].method = newPayment
    res.status(200).json({"mensaje": `Metodo de pago modificado a ${newPayment}`})
}

exports.deletePayment = (req, res) => {
    let paymentMethodFind = paymentMethods.find(element => element.id == parseInt(req.params.idPayment)) 
    let indexPaymentMethod = paymentMethods.indexOf(paymentMethodFind)
    paymentMethods.splice(indexPaymentMethod, 1)
    res.status(200).json({"mensaje":"Metodo de pago eliminado"})
}