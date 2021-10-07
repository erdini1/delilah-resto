const express = require('express')
const router = express.Router()
let productsModels = require('../models/products')
const middles = require('../middlewares/products')

//Listado de products
router.get('/', middles.validate_started_session, (req, res) => {
    res.status(200).json({Products: productsModels})
})

//El Admin puede crear un nuevo product
router.post('/', middles.validate_started_session, middles.validate_admin, middles.validate_data_body, (req, res) => {
    let product = req.body
    if((productsModels[productsModels.length - 1]) != undefined){
        product.id = productsModels[productsModels.length - 1].id + 1 
    } else{
        product.id = 1
    }
    productsModels.push(product)
    res.status(201).json({"mensaje":"Producto agregado"})
})

//El Admin puede modificar un product pasado por parametro
router.put('/:idProduct', middles.validate_started_session, middles.validate_admin, middles.validate_data_body, middles.validate_id_product, (req, res) => {
    const product = req.product
    const indexProduct = productsModels.indexOf(product)
    productsModels[indexProduct].name = req.body.name
    productsModels[indexProduct].price = parseInt(req.body.price)
    res.status(200).json({"mensaje": "Producto actualizado"})
    
})

//El Admin puede eliminar un product pasado por parametro
router.delete('/:idProduct', middles.validate_started_session, middles.validate_admin, middles.validate_id_product, (req, res) => {
    const product = req.product
    const indexProduct = productsModels.indexOf(product)
    productsModels.splice(indexProduct, 1)
    res.status(200).json({"mensaje": "Producto eliminado"})
}) 

module.exports = router