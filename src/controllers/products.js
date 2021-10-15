const productsModels = require('../models/products')

exports.productList = (req, res) =>{
    res.status(200).json({Products: productsModels})
}

exports.newProduct = (req, res) => {
    let product = req.body
    if((productsModels[productsModels.length - 1]) != undefined){
        product.id = productsModels[productsModels.length - 1].id + 1 
    } else{
        product.id = 1
    }
    productsModels.push(product)
    res.status(201).json({"mensaje":"Producto agregado"})
}

exports.modifyProduct = (req, res) => {
    const product = req.product
    const indexProduct = productsModels.indexOf(product)
    productsModels[indexProduct].name = req.body.name
    productsModels[indexProduct].price = parseInt(req.body.price)
    res.status(200).json({"mensaje": "Producto actualizado"})
}

exports.deleteProduct = (req, res) => {
    const product = req.product
    const indexProduct = productsModels.indexOf(product)
    productsModels.splice(indexProduct, 1)
    res.status(200).json({"mensaje": "Producto eliminado"})
}