const products = require('../models/products')
const productsModels = require('../models/products')
const productosDB = require('../modelsdb/products')
const { getAll, createProduct, modifyProduct, deleteProduct } = require('../repositories/products')

exports.productList = async (req, res) =>{
    const products = await getAll()
    res.status(200).json({Products: products})
}

exports.postProduct = async (req, res) => {
    const product = req.body
    const newProduct = await createProduct(product)
    
    /* if((productsModels[productsModels.length - 1]) != undefined){
        product.id = productsModels[productsModels.length - 1].id + 1 
    } else{
        product.id = 1
    }
    productsModels.push(product) */


    res.status(201).json({"mensaje":"Producto agregado"})
}

exports.putProduct = async (req, res) => {
    const idParams = parseInt(req.params.idProduct)
    const body = req.body
    const product = await modifyProduct(idParams, body)

    /* const product = req.product
    const indexProduct = productsModels.indexOf(product)
    console.log(product)
    productsModels[indexProduct].name = req.body.name
    productsModels[indexProduct].price = parseInt(req.body.price) */


    res.status(200).json({"mensaje": "Producto actualizado"})
}

exports.deleteProduct = async (req, res) => {
    const idParams = parseInt(req.params.idProduct)
    const product = await deleteProduct(idParams)
    
    /* const product = req.product
    const indexProduct = productsModels.indexOf(product)
    productsModels.splice(indexProduct, 1) */
    res.status(200).json({"mensaje": "Producto eliminado"})
}