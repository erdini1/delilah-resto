//let productsModels = require('../models/products')
let orders = require('../models/orders')
const states = require('../constantes/states')
const { checkIdProduct } = require('../repositories/products')
const { checkIdOrder } = require('../repositories/orders')

async function validate_data_orders(req, res, next) {
    const { details } = req.body
    if(details != undefined){
        let counter = 0
        for await (product of details){
            if(product.product_id != undefined && product.amount != undefined){
                const productFind = await checkIdProduct(product.product_id)
                if(productFind){
                    counter++       //hecho
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
    })      //hecho
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
        }   //hecho
    }
}

function modify_order(req, res, next){
    const idParams = parseInt(req.params.idOrder)
    const order = orders.find(element => element.idOrder === idParams)
    const ordersFilter = orders.filter(element => element.idUser == req.headers.id_user)
    if(!order){
        res.status(400).json({"mensaje":"El pedido no existe"})
    } else{
        let flag = false
        for(let i = 0; i<ordersFilter.length; i++){
            if(order == ordersFilter[i] ){
                flag = true
                if(order.state == "pendiente"){
                    next()
                } else{
                    res.status(400).json({"mensaje":"El pedido ya no se puede modificar"})
                    return
                }
            }
        }
        if(flag == false){
            res.status(400).json({"mensaje":"No puede modificar un pedido que no sea suyo"})
            return
        }
    }
}

module.exports = {
    validate_data_orders,
    validate_id_order,
    modify_states,
    modify_order
}