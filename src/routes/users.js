const express = require('express')
const router = express.Router()
const middles = require('../middlewares/users')
const { register, login, modifyUser, userDisabled } = require('../controllers/users')
const { getAddressUser, newAddress } = require('../controllers/address')
const { validate_started_session, validate_admin } = require('../middlewares/products')
const { validate_data_address, validate_id_user } = require('../middlewares/address')

//Registro
router.post('/', middles.validate_data_register, register)

//Inicio de sesion
router.post('/login',  middles.validate_data_login, login)

//Endpoint para asginar a un usuario como admin
router.put('/:idUser', validate_started_session, validate_id_user, middles.verify_disabled, modifyUser)

//El usuario puede listar sus direcciones
router.get('/:idUser/address', validate_started_session, validate_id_user, middles.verify_disabled, getAddressUser)

//El ususario puede agregar otra direccion
router.post('/:idUser/address', validate_started_session, validate_data_address, validate_id_user, middles.verify_disabled, newAddress)

//El admin puede deshabilitar un usuario
router.put('/:idUser/disabled', validate_started_session, validate_admin, userDisabled)

module.exports = router