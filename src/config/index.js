require('dotenv').config()

exports.config = {
    db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        databse: process.env.DB_NAME
    },
    server: {
        port: process.env.NODE_PORT,
        signature: process.env.SECRETKEY
    }
}