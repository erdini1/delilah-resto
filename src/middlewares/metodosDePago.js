const metodosPago = require('../models/metodosDePago')

function validar_id_pago(req, res, next){
    const idParams = parseInt(req.params.idPago)
    const metodoDePago = metodosPago.find(elemento => elemento.id == idParams)
    if(!Number.isInteger(idParams) || idParams == undefined){
        res.status(400).json({"mensaje" : "El id del metodo debe ser un numero entero"})

    }else{
        if(!metodoDePago){
            res.status(400).json({"mensaje":"El id indicado no pertenece a un metodo de pago"})
        } else{
            req.metodoPago = metodoDePago
            next()
        }
    }
}

function validar_metodo_pago(req, res, next){
    let metodoDePago = req.body.pago
    let metodoExistente = metodosPago.find(elemento => elemento.metodo === metodoDePago)
    if(!metodoExistente){
        res.status(400).json({
            "mensaje":`No ingreso un metodo de pago valido`,
            "Pruebe con ": metodosPago
        })
    } else{
        next()
    }
}

module.exports = {
    validar_id_pago,
    validar_metodo_pago
}