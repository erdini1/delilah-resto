const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../connection/sequelize')

class Product extends Model { }

Product.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {sequelize, modelName: 'Products'})

module.exports = { Product }