const { getAll, createProduct, modifyProduct, deleteProduct } = require('../repositories/products')

exports.productList = async (req, res) =>{
    const products = await getAll()
    res.status(200).json({Products: products})
}

exports.postProduct = async (req, res) => {
    const product = req.body
    const newProduct = await createProduct(product)
    res.status(201).json({"mensaje":"Producto agregado"})
}

exports.putProduct = async (req, res) => {
    const idParams = parseInt(req.params.idProduct)
    const body = req.body
    const product = await modifyProduct(idParams, body)
    res.status(200).json({"mensaje": "Producto actualizado"})
}

exports.deleteProduct = async (req, res) => {
    const idParams = parseInt(req.params.idProduct)
    const product = await deleteProduct(idParams)
    res.status(200).json({"mensaje": "Producto eliminado"})
}