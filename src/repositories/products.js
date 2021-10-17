//const products = require('../models/products')
const {Product} = require('../modelsdb/products')

exports.getAll = async () => {
    return await Product.findAll()
}

exports.createProduct = async (product) => {
    return await Product.create({
        name: product.name,
        price: product.price
    })
}

exports.modifyProduct = async (idProduct, bodyProduct) => {
    return await Product.update({
        name: bodyProduct.name,
        price: bodyProduct.price
    }, {
        where: {
            id: idProduct
        }
    })
}

exports.deleteProduct = async (idProduct) => {
    return await Product.destroy({
        where: {
            id: idProduct
        }
    })
}

exports.checkIdProduct = async (idProduct) => {
    return await Product.findOne({
        where: {
            id: idProduct
        }
    })
}

exports.checkName = async (nameProduct) => {
    return await Product.findOne({
        where: {
            name: nameProduct
        }
    })
}