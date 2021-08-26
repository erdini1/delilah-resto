const productosModels = require('../models/productos')
let usuarios = require('../models/usuarios')


function validar_sesion_iniciada(req, res, next){
    const idHeaders = parseInt(req.headers.id_usuario)
    const usuario = usuarios.find(elemento => elemento.id === idHeaders)
    if(!Number.isInteger(idHeaders) || idHeaders == undefined){
        res.status(400).json({"mensaje" : "El Id del usuario debe ser un numero entero"})

    }else{
        if(!usuario){
            res.status(401).json({"mensaje":"El id no pertenece a un usuario"})
        } else{
            next()
        }
    }
}

function validar_admin (req, res, next){
    const idHeaders = parseInt(req.headers.id_usuario)
    const usuario = usuarios.find(elemento => elemento.id === idHeaders)

    if(usuario.rol === "admin"){
        next()
    } else{
        res.status(403).json({"mensaje":"Solo el administrador puede realizar esa accion"})
    }

}

function validar_datos_body(req, res, next){
    const producto = req.body
    let productoRepetido = productosModels.find(elemento => elemento.nombre == producto.nombre)
    if(producto.nombre != undefined && producto.precio != undefined){
        if(productoRepetido){
            res.status(400).json({"mensaje":"No puede agregar productos repetidos"})
        } else{
           next() 
        }
    } else{
        res.status(400).json({"mensaje":"Tiene que ingresar el nombre y el precio del producto"})
    }
}

function validar_id_producto(req, res, next){
    const idParams = parseInt(req.params.idProducto)
    const producto = productosModels.find(elemento => elemento.id === idParams)
    if(!Number.isInteger(idParams) || idParams == undefined){
        res.status(422).json({"mensaje" : "El id del producto debe ser un numero entero"})

    }else{
        if(!producto){
            res.status(400).json({"mensaje":"El id indicado no pertenece a un producto"})
        } else{
            req.producto = producto
            next()
        }
    }
}

module.exports = {
    validar_id_producto,
    validar_sesion_iniciada,
    validar_admin,
    validar_datos_body
}