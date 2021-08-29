let productosModels = require('../models/productos')
let pedidos = require('../models/pedidos')
const Estados = require('../constantes/estados')

function validar_datos_pedidos(req, res, next) {
    let pedido = req.body
    if(pedido.detalle != undefined){
        let contador = 0            
        pedido.detalle.forEach(productoDetalle => {
            if(productoDetalle.idProducto != undefined && productoDetalle.cantidad != undefined){
                let productoBuscado = productosModels.find(elemento => elemento.id == productoDetalle.idProducto)
                if(productoBuscado){
                    contador++
                }
            }
        })
        if(contador === pedido.detalle.length){
            next()
        } else{
            res.status(400).json({"mensaje":"Tiene que ingresar un id del producto existente e indicar la cantidad"})
        }
    } else{
        res.status(400).json({"mensaje":"No puede dejar datos en blanco"})
    }
    
}

function modificar_estado(req, res, next){
    let estado = req.body.estado
    if(!Estados[estado]){
        res.status(400).json({
            "mensaje":"Tiene que ingresar un estado valido",
            estados : Estados
    })
    } else{
        next()
    }
}

function validar_id_pedido(req, res, next){
    const idParams = parseInt(req.params.idPedido)
    const pedido = pedidos.find(elemento => elemento.idPedido === idParams)
    if(!Number.isInteger(idParams) || idParams == undefined){
        res.status(400).json({"mensaje" : "El id del pedido debe ser un numero entero"})

    }else{
        if(!pedido){
            res.status(400).json({"mensaje":"El id indicado no pertenece a un pedido"})
        } else{
            req.pedido = pedido
            next()
        }
    }
}

function modificar_pedido(req, res, next){
    const idParams = parseInt(req.params.idPedido)
    const pedido = pedidos.find(elemento => elemento.idPedido === idParams)
    const filtroPedidos = pedidos.filter(elemento => elemento.idUsuario == req.headers.id_usuario)
    if(!pedido){
        res.status(400).json({"mensaje":"El pedido no existe"})
    } else{
        let bandera = false
        for(let i = 0; i<filtroPedidos.length; i++){
            if(pedido == filtroPedidos[i] ){
                bandera = true
                if(pedido.estado == "pendiente"){
                    next()
                } else{
                    res.status(400).json({"mensaje":"El pedido ya no se puede modificar"})
                    return
                }
            }
        }
        if(bandera == false){
            res.status(400).json({"mensaje":"No puede modificar un pedido que no sea suyo"})
            return
        }
    }
}

module.exports = {
    validar_datos_pedidos,
    validar_id_pedido,
    modificar_estado,
    modificar_pedido
}