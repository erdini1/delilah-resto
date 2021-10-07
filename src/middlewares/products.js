const productsModels = require('../models/products')
let users = require('../models/users')
const jwt = require('jsonwebtoken')
const { config } = require('../config')

function validate_started_session(req, res, next){
    /* onst stringtoken = req.headers.authorization
    const token = stringtoken.split(" ")[1]
    const decodificado = jwt.verify(token, ${config.server.signature})
    console.log(decodificado) */


    /* console.log("middleware")
    try {
        const stringtoken = req.headers.authorization
        const token = stringtoken.split(" ")[1]
        console.log(token)
        const decodificado = jwt.verify(token, ${config.server.signature})           //MIRAR ESTO Y LIMPIAR LOS COMENTARIOS Y LOS CONSOLE.LOG
        console.log(decodificado)
        next()

    } catch (error) {
        res.status(401).json(error)
    } */


    const idHeaders = parseInt(req.headers.id_user)
    const user = users.find(element => element.id === idHeaders)
    if(!Number.isInteger(idHeaders) || idHeaders == undefined){
        res.status(400).json({"mensaje" : "El Id del usuario debe ser un numero entero"})

    }else{
        if(!user){
            res.status(401).json({"mensaje":"El id no pertenece a un usuario"})
        } else{
            next()
        }
    }
}

function validate_admin (req, res, next){
    const idHeaders = parseInt(req.headers.id_user)
    const user = users.find(element => element.id === idHeaders)

    if(user.rol === "admin"){
        next()
    } else{
        res.status(403).json({"mensaje":"Solo el administrador puede realizar esa accion"})
    }

}

function validate_data_body(req, res, next){
    const product = req.body
    let repeatedProduct = productsModels.find(element => element.name == product.name)
    if(product.name != undefined && product.price != undefined){
        if(repeatedProduct){
            res.status(400).json({"mensaje":"No puede agregar productos repetidos"})
        } else{
           next() 
        }
    } else{
        res.status(400).json({"mensaje":"Tiene que ingresar el nombre y el precio del producto"})
    }
}

function validate_id_product(req, res, next){
    const idParams = parseInt(req.params.idProduct)
    const product = productsModels.find(element => element.id === idParams)
    if(!Number.isInteger(idParams) || idParams == undefined){
        res.status(422).json({"mensaje" : "El id del producto debe ser un numero entero"})

    }else{
        if(!product){
            res.status(400).json({"mensaje":"El id indicado no pertenece a un producto"})
        } else{
            req.product = product
            next()
        }
    }
}

module.exports = {
    validate_started_session,
    validate_admin,
    validate_data_body,
    validate_id_product
}