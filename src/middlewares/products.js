const { config } = require('../config')
const { checkIdProduct, checkName } = require('../repositories/products')
const {client} = require('../connection/redis')
const { token } = require('../functions/token')

async function validate_started_session(req, res, next){

    try {
        let stringToken = req.headers.authorization
        const decoded = token(stringToken)
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({msg: "Token invalido"})
    } 
}

async function validate_admin (req, res, next){

    /* let stringToken = req.headers.authorization
    const token = stringToken.split(" ")[1]
    const decoded = jwt.verify(token, config.server.signature) */
    let stringToken = req.headers.authorization
    const decoded = token(stringToken)
    if(decoded.admin === true){
        next()
    } else{
        res.status(403).json({"mensaje":"Solo el administrador puede realizar esa accion"})
    }
}

async function validate_data_body(req, res, next){
    const { name, price} = req.body
    if(name != undefined && price != undefined){
        const product = await checkName(name)
        if(!product){
            next()
        } else{
            res.status(400).json({msg: "No puede haber productos repetidos"})
        }
    } else{
        res.status(400).json({msg: "Tiene que ingresar un nombre y un precio del producto"})
    }
}

async function validate_id_product(req, res, next){
    const idParams = parseInt(req.params.idProduct)
    const product = await checkIdProduct(idParams)
    if(Number.isInteger(idParams) || idParams != undefined){
        if(product){
            next()
        } else{
            res.status(400).json({"mensaje":"El id indicado no pertenece a un producto"})
        }
    }else{
        res.status(422).json({"mensaje" : "El id del producto debe ser un numero entero"})
    }
}

function cacheGet(req, res, next){
    client.get("products", (error, reply) => {
        if(error){
            res.status(400).json({msg: error})
        } else{
            req.cache = JSON.parse(reply)
            next() 
        }
    })
}

module.exports = {
    validate_started_session,
    validate_admin,
    validate_data_body,
    validate_id_product, 
    cacheGet
}