const express = require('express')
const router = express.Router()
// let users = require('../models/users')
const middles = require('../middlewares/users')
// const jwk = require('jsonwebtoken')
const { register, login } = require('../controllers/users')

//Registro
router.post('/', middles.validate_data_user, middles.validate_data_register, register)

//Inicio de sesion
router.post('/login', middles.validate_data_login, login)

module.exports = router