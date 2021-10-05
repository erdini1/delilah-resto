const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../src/connection/sequelize')

class Product extends Model { }

Product.init({
    name: {
        type: DataTypes.STRING,                             //En ingles
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    // timestamps: false,
}, {sequelize, modelName: 'Products'})

module.exports = { Product }