const express = require('express')
const router = express.Router()
let usuarios = require('../models/usuarios')
const middlesProd = require('../middlewares/productos')
const middlesPedid = require('../middlewares/pedidos')
const pedidos = require('../models/pedidos')
const productosModels = require('../models/productos')

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

router.post('/', middlesProd.validar_sesion_iniciada, (req, res) => {
    
    let pedido = req.body
    let usuario = usuarios.find(elemento => elemento.id === parseInt(req.headers.id_usuario))
    let totalPrecios = 0
    let i = 0
    pedido.detalle.forEach(productoDetalle => {
        let productoBuscado = productosModels.productos.find(elemento => elemento.id == productoDetalle.idProducto)
        if(productoBuscado){
            totalPrecios = totalPrecios + (parseInt(productoBuscado.precio)*parseInt(pedido.detalle[i].cantidad))
            i++;
        }
    })
    pedido.total = totalPrecios
    pedido.estado = "pendiente"
    if(pedido.direccion === undefined){
        pedido.direccion = usuario.direccion
    }else{
        pedido.direccion = pedido.direccion
    }
    pedido.hora = "12:00"
    pedido.idPedido = pedidos[pedidos.length - 1].idPedido + 1
    pedido.idUsuario = req.headers.id_usuario

    pedidos.push(pedido)

    res.status(201).json({"mensaje":`Pedido agregado`})

})

router.put('/:idPedido', middlesProd.validar_sesion_iniciada, middlesProd.validar_admin,  middlesPedid.modificar_estado, middlesPedid.validar_id_pedido, (req,res) => {
    const estado = req.body.estado
    let pedido = req.pedido
    pedido.estado = estado
    res.status(200).json({"mensaje":`Estado modificado a ${estado}`})
})




module.exports = router