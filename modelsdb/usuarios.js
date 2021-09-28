const { Model, DataTypes, Op } = require('sequelize')
const { all } = require('../routes/usuarios')
const { sequelize } = require('../src/connection/sequelize')

class Usuario extends Model {}

Usuario.init({
    nombreUsuario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nombreApellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefono: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    direccionEnvio: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contrasenia: {
        type: DataTypes.STRING,
        allowNull: false
    },
    confContrasenia: {
        type: DataTypes.STRING,
        allowNull: false
    },
    admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {sequelize, modelName: 'Usuarios'})

module.exports = { 
    Usuario, 
    Op
}