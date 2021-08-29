const express = require('express')
const router = express.Router()
const metodosPago  = require('../models/metodosDePago')
const middlesProd = require('../middlewares/productos')
const middlesPagos = require('../middlewares/metodosDePago')

router.get('/', middlesProd.validar_sesion_iniciada, middlesProd.validar_admin, (req, res) => {
    res.status(200).json({"Metodos de pago": metodosPago})
})

router.post('/', middlesProd.validar_sesion_iniciada, middlesProd.validar_admin, (req, res) => {
    let metodoNuevo = req.body
    if(metodoNuevo.metodo != undefined && metodoNuevo.metodo != ""){
        let metodoDePagoExistente = metodosPago.find(elemento => elemento.metodo === metodoNuevo.metodo)
        if(!metodoDePagoExistente){
            if((metodosPago[metodosPago.length - 1]) != undefined){
                metodoNuevo.id = metodosPago[metodosPago.length - 1].id + 1 
            } else{
                metodoNuevo.id = 1
            }
            metodosPago.push(metodoNuevo)
            res.status(201).json({"mensaje":"Metodo de pago agregado"})
        } else{
            res.status(400).json({"mensaje":"El metodo de pago ya existe"})
        }
    }else{
        res.status(400).json({"mensaje":"No puede dejar el campo de metodo vacio"})
    }
    
})

router.put('/:idPago', middlesProd.validar_sesion_iniciada, middlesProd.validar_admin, middlesPagos.validar_id_pago, (req, res) => {
    let metodoDePago = metodosPago.find(elemento => elemento.id == parseInt(req.params.idPago)) 
    let indexMetodoDePago = metodosPago.indexOf(metodoDePago)
    let pagoModificado = req.body.metodo
    metodosPago[indexMetodoDePago].metodo = pagoModificado
    res.status(200).json({"mensaje": `Metodo de pago modificado a ${pagoModificado}`})
})

router.delete('/:idPago', middlesProd.validar_sesion_iniciada, middlesProd.validar_admin, middlesPagos.validar_id_pago, (req, res) => {
    let metodoDePago = metodosPago.find(elemento => elemento.id == parseInt(req.params.idPago)) 
    let indexMetodoDePago = metodosPago.indexOf(metodoDePago)
    metodosPago.splice(indexMetodoDePago, 1)
    res.status(200).json({"mensaje":"Metodo de pago eliminado"})
})

module.exports = router