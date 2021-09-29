const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../src/connection/sequelize')

class Productos extends Model { }

Productos.init({
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precio: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {sequelize, modelName: 'Productos'})

module.exports = {
    Productos
}