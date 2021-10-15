const {sequelize} = require('../src/connection/sequelize')
const {Model, DataTypes} = require('sequelize')

class PaymentMethod extends Model { }

PaymentMethod.init({                                    //en ingles
    method: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // timestamps: false,
}, {sequelize, modelName: 'PaymentMethods'})

module.exports = { PaymentMethod }