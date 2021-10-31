const express = require('express');
const cors = require('cors')
const {sequelize} = require('./src/connection/sequelize')
const {config} = require('./src/config')
const helmet = require('helmet')
const app = express();
app.use(cors())
app.use(express.json())
app.use(helmet())

// ;(async() => {
//     await sequelize.sync()
// })();

const users = require('./src/routes/users')
app.use('/users', users)

const products = require('./src/routes/products')
app.use('/products', products)

const orders = require('./src/routes/orders')
app.use('/orders', orders)

const paymentMethods = require('./src/routes/paymentMethods')
app.use('/payments', paymentMethods)

const address = require('./src/routes/address')
app.use('/address', address)

app.listen(config.server.port, () =>  console.log(`Servidor corriendo en el puerto ${config.server.port}!`))