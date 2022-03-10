const { sequelize } = require("../connection/sequelize");
const { Model, DataTypes } = require('sequelize')

class Order extends Model { }

Order.init({
    total: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {sequelize, modelName: 'Orders'})

class OrderDetail extends Model { }

OrderDetail.init({
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {sequelize, modelName: "OrderDetails"})


module.exports = { Order , OrderDetail}