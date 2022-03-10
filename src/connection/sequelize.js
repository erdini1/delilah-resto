const {config} = require('../config')

const Sequelize = require('sequelize')

exports.sequelize = new Sequelize(config.db.databse, config.db.user, config.db.password, {
    host: config.db.host,
    dialect: "mariadb",
    define: {
        timestamps: false
    },
    logging: false
})