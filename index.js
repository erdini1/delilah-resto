const express = require('express');
const cors = require('cors')
const {sequelize} = require('./src/connection/sequelize')
const {config} = require('./src/config')
const modelsdb = require('./modelsdb/users')
const helmet = require('helmet')
const app = express();
app.use(cors())
app.use(express.json())
app.use(helmet())

// ;(async() => {
//     await sequelize.sync()
// })();

const usuarios = require('./src/routes/usuarios')
app.use('/usuarios', usuarios)

const productos = require('./src/routes/productos')
app.use('/productos', productos)

const pedidos = require('./src/routes/pedidos')
app.use('/pedidos', pedidos)

const metodosDePago = require('./src/routes/metodosDePago')
app.use('/pagos', metodosDePago)

app.listen(config.server.port, () =>  console.log(`Servidor corriendo en el puerto ${config.server.port}!`))