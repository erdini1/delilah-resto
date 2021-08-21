let productosModels = require('../models/productos')
let pedidos = require('../models/pedidos')

function validar_datos_pedidos(req, res, next) {
    let pedido = req.body
    //if()
                //SEGUIR MIRANDO ESTO, LA VALIDACION DEL BODY
                
    pedido.detalle.forEach(productoDetalle => {
        let productoBuscado = productosModels.productos.find(elemento => elemento.id == productoDetalle.id)
        if(productoBuscado){
            totalPrecios = totalPrecios + parseInt(productoBuscado.precio)*parseInt(pedido.detalle)
        }
    })
    let valores = Object.values(pedido.detalle[0])
    let valoresExistentes = valores.find(elemento => elemento === undefined)
    if(valoresExistentes){
        res.status(400).json({"mensaje":"Tiene que ingresar el id del producto y la cantidad"})
    }

}

function modificar_estado(req, res, next){
    let estado = req.body.estado
    if(estado == undefined){
        res.status(400).json({"mensaje":"Tiene que ingresar un estado"})
    } else{
        next()
    }
}

function validar_id_pedido(req, res, next){
    const idParams = parseInt(req.params.id_pedido)
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

module.exports = {
    validar_datos_pedidos,
    validar_id_pedido,
    modificar_estado
}