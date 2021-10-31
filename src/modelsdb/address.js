const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../connection/sequelize')

class Address extends Model { }

Address.init({
    address: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {sequelize, modelName: "Address"})

module.exports = {Address}