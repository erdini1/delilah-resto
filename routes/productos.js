const express = require('express')
const router = express.Router()
let productosModels = require('../models/productos')
const middles = require('../middlewares/productos')

//Ver lista de productos solo si el idUsuario esta dentro del array usuariosLogueados
/* router.get('/:idUsuario', middles.validar_params_user, middles.validar_sesion_iniciada, (req, res) => {
    res.status(200).json({Productos: productos})
}) */

router.get('/', middles.validar_sesion_iniciada, (req, res) => {
    res.status(200).json({Productos: productosModels.productos})
})

router.post('/', middles.validar_sesion_iniciada, middles.validar_admin, middles.validar_datos_body, (req, res) => {
    let producto = req.body
    producto.id = productosModels.productos[productosModels.productos.length - 1].id + 1
    productosModels.productos.push(producto)
    res.status(201).json({"mensaje":"Producto agregado"})
})

router.put('/:idProducto', middles.validar_sesion_iniciada, middles.validar_admin, middles.validar_datos_body, middles.validar_id_producto, (req, res) => {
    const producto = req.producto
    const indiceProducto = productosModels.productos.indexOf(producto)
    productosModels.productos[indiceProducto].nombre = req.body.nombre
    productosModels.productos[indiceProducto].precio = parseInt(req.body.precio)
    res.status(200).json({"mensaje": "Producto actualizado"})
    
})

router.delete('/:idProducto', middles.validar_sesion_iniciada, middles.validar_admin, middles.validar_id_producto, (req, res) => {
    const producto = req.producto
    const indiceProducto = productosModels.productos.indexOf(producto)
    productosModels.productos.splice(indiceProducto, 1)
    res.status(200).json({"mensaje": "Producto eliminado"})
}) 

module.exports = router