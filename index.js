const express = require('express');
const app = express();
const cors = require('cors')
const {sequelize} = require('./src/connection/sequelize')
const modelsdb = require('./modelsdb/users')

app.use(cors())
app.use(express.json())

// ;(async() => {
//     await sequelize.sync()
// })();

const usuarios = require('./routes/usuarios')
app.use('/usuarios', usuarios)

const productos = require('./routes/productos')
app.use('/productos', productos)

const pedidos = require('./routes/pedidos')
app.use('/pedidos', pedidos)

const metodosDePago = require('./routes/metodosDePago')
app.use('/pagos', metodosDePago)

app.listen(3000, () =>  console.log("Servidor corriendo en el puerto 3000!"))