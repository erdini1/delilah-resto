const Sequelize = require('sequelize')

exports.sequelize = new Sequelize('SprintProject', "root", "159dae159", {
    host: 'localhost',
    dialect: "mariadb"              //LUEGO AGREGAR VARIABLES DE ENTORNO DOTENV
})