const express = require('express')
const router = express.Router()
let productosModels = require('../models/productos')
const middles = require('../middlewares/productos')

//Listado de productos
router.get('/', middles.validar_sesion_iniciada, (req, res) => {
    res.status(200).json({Productos: productosModels})
})

//El Admin puede crear un nuevo producto
router.post('/', middles.validar_sesion_iniciada, middles.validar_admin, middles.validar_datos_body, (req, res) => {
    let producto = req.body
    if((productosModels[productosModels.length - 1]) != undefined){
        producto.id = productosModels[productosModels.length - 1].id + 1 
    } else{
        producto.id = 1
    }
    productosModels.push(producto)
    res.status(201).json({"mensaje":"Producto agregado"})
})

//El Admin puede modificar un producto pasado por parametro
router.put('/:idProducto', middles.validar_sesion_iniciada, middles.validar_admin, middles.validar_datos_body, middles.validar_id_producto, (req, res) => {
    const producto = req.producto
    const indiceProducto = productosModels.indexOf(producto)
    productosModels[indiceProducto].nombre = req.body.nombre
    productosModels[indiceProducto].precio = parseInt(req.body.precio)
    res.status(200).json({"mensaje": "Producto actualizado"})
    
})

//El Admin puede eliminar un producto pasado por parametro
router.delete('/:idProducto', middles.validar_sesion_iniciada, middles.validar_admin, middles.validar_id_producto, (req, res) => {
    const producto = req.producto
    const indiceProducto = productosModels.indexOf(producto)
    productosModels.splice(indiceProducto, 1)
    res.status(200).json({"mensaje": "Producto eliminado"})
}) 

module.exports = router