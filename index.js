const express = require('express');
const app = express();

app.use(express.json())

const usuarios = require('./routes/usuarios')
app.use('/usuarios', usuarios)

const productos = require('./routes/productos')
app.use('/productos', productos)

const pedidos = require('./routes/pedidos')
app.use('/pedidos', pedidos)

const metodosDePago = require('./routes/metodosDePago')
app.use('/pagos', metodosDePago)

app.listen(3000, () =>  console.log("Servidor corriendo en el puerto 3000!"))