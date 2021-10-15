const { sequelize } = require("../src/connection/sequelize");
const { Model, DataTypes } = require('sequelize')

class Order extends Model { }

Order.init({
    newAddres: {
        type: DataTypes.STRING,                     //en ingles
        allowNull: false,
    },
    total: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: true,        //VER ESTO
        allowNull: false
    },
    // timestamps: false,
}, {sequelize, modelName: 'Orders'})

class OrderDetail extends Model { }

OrderDetail.init({
    amount: {
        type: DataTypes.INTEGER,            /* { through: 'User_Profiles' } */ //MIRAR ESTO, PUEDE SERVIR BASTYNATE
        allowNull: false
    },
    // timestamps: false,
}, {sequelize, modelName: "OrderDetails"})


module.exports = { Order , OrderDetail}