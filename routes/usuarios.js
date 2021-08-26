const express = require('express')
const router = express.Router()
let usuarios = require('../models/usuarios')
const middles = require('../middlewares/usuarios')

//Registro
router.post('/registro', middles.validar_datos_usuarios, middles.validar_datos_registro, (req, res) => {
    const nuevoUsuario = req.body
    usuarios.push(nuevoUsuario)
    res.status(201).json({"mensaje":`Usuario Creado con exito, su id es ${nuevoUsuario.id}`})
})

//Inicio de sesion
router.post('/login', middles.validar_datos_login, (req, res) => {
    res.status(200).json({"mensaje":"Ingreso correctamente"})
})

module.exports = router