const { Model, DataTypes, Op } = require('sequelize')
const { sequelize } = require('../connection/sequelize')
const {Order, OrderDetail } = require('./orders')
const {Product} = require('./products')
const {PaymentMethod} = require('./paymentMethods')

class User extends Model {}

User.init({
    username: {
        type: DataTypes.STRING,                                            //EN INGLES
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    passwordConf: {
        type: DataTypes.STRING,
        allowNull: false
    },
    admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },  //AGREGAR COLUMNA ENABLE
    // timestamps: false
}, {sequelize, modelName: 'Users'})

User.hasMany(Order, {as: "Orders", foreignKey: "user_id"})
Order.hasMany(OrderDetail, {as: "OrderDetails", foreignKey: "order_id"})
Product.hasMany(OrderDetail, {as: "OrderDetails", foreignKey: "product_id"})
PaymentMethod.hasMany(Order, {as: "Orders", foreignKey: "payment_id"})

module.exports = { 
    User, 
    Op
}