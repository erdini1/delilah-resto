const {client} = require('../connection/redis')
const { getAll, createProduct, modifyProduct, deleteProduct, modifyPrice } = require('../repositories/products')

exports.productList = async (req, res) =>{
    const cache = req.cache
    if(cache === null){
        const products = await getAll()
        client.set("products", JSON.stringify(products), 'EX', 60, (err, reply) => {
            if(err){
                res.status(400).json({msg: err})
            }
        })
        res.status(200).json({Products: products})
    } else {
        res.status(200).json({Products: cache})
    }
}

exports.postProduct = async (req, res) => {
    const product = req.body
    const newProduct = await createProduct(product)
    res.status(201).json({"mensaje":"Producto agregado"})
}

exports.putProduct = async (req, res) => {
    const idParams = parseInt(req.params.idProduct)
    const body = req.body
    await modifyProduct(idParams, body)
    res.status(200).json({"mensaje": "Producto actualizado"})
}

exports.deleteProduct = async (req, res) => {
    const idParams = parseInt(req.params.idProduct)
    await deleteProduct(idParams)
    res.status(200).json({"mensaje": "Producto eliminado"})
}

exports.modifyProductPrice = async (req, res) => {
    const idProduct = parseInt(req.params.idProduct)
    const price = req.body.price
    client.del("products")
    await modifyPrice(idProduct, price)
    res.status(200).json({msg: "Precio del producto actualizado"})
}