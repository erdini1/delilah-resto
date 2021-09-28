const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../src/connection/sequelize')

class Productos extends Model { }

Productos.init({
    direccion: {
        type: DataTypes.STRING,
        
    }
})