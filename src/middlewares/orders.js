const states = require('../constantes/states')
const { checkIdProduct } = require('../repositories/products')
const { checkIdOrder } = require('../repositories/orders')
const { token } = require('../functions/token')
const { checkIdAddress, userAddress } = require('../repositories/address')

async function validate_data_orders(req, res, next) {
    const { details } = req.body
    if(details != undefined){
        let counter = 0
        for await (product of details){
            if(product.product_id != undefined && product.amount != undefined){
                const productFind = await checkIdProduct(product.product_id)
                if(productFind){
                    counter++
                }
            }
        }
        if(counter === details.length){
            next()
        } else {
            res.status(400).json({msg: "Tiene que ingresar un id del producto existente e indicar la cantidad de cada uno"})
        }
    } else{
        res.status(400).json({msg: "Tiene que ingresar el detalle de la compra"})
    }
}

function modify_states(req, res, next){
    let state = req.body.state
    if(!states[state]){
        res.status(400).json({
            "mensaje":"Tiene que ingresar un estado valido",
            estados : states
    })
    } else{
        next()
    }
}

async function validate_id_order(req, res, next){
    const idParams = parseInt(req.params.idOrder)
    const order = await checkIdOrder(idParams)
    if(!Number.isInteger(idParams) || idParams == undefined){
        res.status(400).json({"mensaje" : "El id del pedido debe ser un numero entero"})

    }else{
        if(!order){
            res.status(400).json({"mensaje":"El id indicado no pertenece a un pedido"})
        } else{
            next()
        }
    }
}

async function modify_order(req, res, next){
    let stringToken = req.headers.authorization
    const decoded = token(stringToken)
    const idParams = parseInt(req.params.idOrder)
    const order = await checkIdOrder(idParams)
    if(order.state === states.pendiente){
        if(order.user_id === decoded.id){
            next()
        }
        else{
            res.status(400).json({"msg":"No puede modificar un pedido que no sea suyo"})
        }
    } else{
        res.status(400).json({"msg":"El pedido ya no se puede modificar"})
    }
}

async function addAddress(req, res, next){
    const idAddress = req.body.address_id
    if(idAddress != undefined){
        const findAddress = await checkIdAddress(idAddress)
        if(findAddress) {
            req.address = findAddress
            next()
        } else {
            res.status(400).json({msg: "La direccion ingresada no se encuentra registrada"})
        }
    } else {
        res.status(400).json({msg: "Tiene que seleccionar una direccion"})
    }
    
}

async function validate_id_address(req, res, next){
    let stringToken = req.headers.authorization
    const decoded = token(stringToken)

    const idAddress = req.body.address_id
    let address = await userAddress(decoded.id, idAddress)
    if(address != undefined){
        next()
    } else {
        res.status(400).json({msg: "Tiene que ingresar el id de una direccion correspondiente a su usuario"})
    }
}

module.exports = {
    validate_data_orders,
    validate_id_order,
    modify_states,
    modify_order,
    addAddress,
    validate_id_address
}