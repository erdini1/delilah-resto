const express = require('express')
const router = express.Router()
let usuarios = require('../models/usuarios')
const middlesProd = require('../middlewares/productos')
const middlesPedid = require('../middlewares/pedidos')
const middlesPago = require('../middlewares/metodosDePago')
const pedidos = require('../models/pedidos')
const productosModels = require('../models/productos')
const Estados = require('../constantes/estados')

//El admin puede ver todos los pedidos, El usuario puede ver sus pedidos
router.get('/', middlesProd.validar_sesion_iniciada, (req, res) => {
    const idHeaders = parseInt(req.headers.id_usuario)
    usuario = usuarios.find(elemento => elemento.id === idHeaders)
    if(usuario.rol === "admin"){
        res.status(200).json({"Pedidos":pedidos})
    } else{
        let pedidosDelUsuario = pedidos.filter(elemento => elemento.idUsuario == idHeaders)
        res.status(200).json({"Pedidos": pedidosDelUsuario})
    }
})

//El usuario puede realizar un pedido
router.post('/', middlesProd.validar_sesion_iniciada, middlesPedid.validar_datos_pedidos, middlesPago.validar_metodo_pago, (req, res) => {
    
    let pedido = req.body
    let usuario = usuarios.find(elemento => elemento.id === parseInt(req.headers.id_usuario))
    let totalPrecios = 0
    let i = 0
    pedido.detalle.forEach(productoDetalle => {
        let productoBuscado = productosModels.find(elemento => elemento.id == productoDetalle.idProducto)
        if(productoBuscado){
            totalPrecios = totalPrecios + (parseInt(productoBuscado.precio)*parseInt(pedido.detalle[i].cantidad))
            i++;
        }
    })
    pedido.total = totalPrecios
    pedido.estado = Estados.pendiente
    pedido.direccion = pedido.direccion
    if(pedido.direccion == undefined){
        pedido.direccion = usuario.direccionEnvio
    }
    pedido.hora = "12:00"
    pedido.idPedido = pedidos[pedidos.length - 1].idPedido + 1
    pedido.idUsuario = req.headers.id_usuario

    pedidos.push(pedido)

    res.status(201).json({"mensaje":`Pedido agregado`})

})

//El usuario puede modificar su pedido solo mientras el estado sea "pendiente"
router.put('/:idPedido', middlesProd.validar_sesion_iniciada, middlesPedid.validar_id_pedido, middlesPedid.modificar_pedido, middlesPedid.validar_datos_pedidos, middlesPago.validar_metodo_pago, (req, res) => {
    let datosAModificar = req.body
    let idParams = req.params.idPedido
    let pedido = pedidos.find(elemento => elemento.idPedido == idParams)
    pedido.detalle = datosAModificar.detalle
    pedido.pago = datosAModificar.pago
    let totalPrecios = 0
    let i = 0
    pedido.detalle.forEach(productoDetalle => {
        let productoBuscado = productosModels.find(elemento => elemento.id == productoDetalle.idProducto)
        if(productoBuscado){
            totalPrecios = totalPrecios + (parseInt(productoBuscado.precio)*parseInt(pedido.detalle[i].cantidad))
            i++;
        }
    })
    pedido.total = totalPrecios
    pedido.direccion = datosAModificar.direccion
    pedido.hora = "12:40"
    res.status(200).json({"mensaje":"Pedido actualizado"})
})

//El admin puede modificar el estado del pedido solo si ya esta confirmado
router.put('/:idPedido/estado', middlesProd.validar_sesion_iniciada, middlesProd.validar_admin,  middlesPedid.validar_id_pedido, middlesPedid.modificar_estado, (req,res) => {
    const estado = req.body.estado
    let pedido = req.pedido

    if(pedido.estado === Estados.pendiente){
        res.status(400).json({"mensaje":"No puede modificar un pedido que no esta cerrado"})
    } else{
        pedido.estado = estado
        res.status(200).json({"mensaje":`Estado modificado a ${estado}`})
    }
    
})

//El usuario puede confirmar su pedido
router.put('/:idPedido/confirmacion', middlesProd.validar_sesion_iniciada, middlesPedid.validar_id_pedido, middlesPedid.modificar_pedido, (req, res) => {
    const idParams = req.params.idPedido
    let pedido = pedidos.find(elemento => elemento.idPedido == idParams)
    const indexPedido = pedidos.indexOf(pedido)
    pedidos[indexPedido].estado = Estados.confirmado
    res.status(200).json({"mensaje":"Estado modificado a confirmado, ya no lo puede modificar"})
})

module.exports = router

