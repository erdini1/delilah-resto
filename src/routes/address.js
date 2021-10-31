const express = require('express')
const { getAddressUser } = require('../controllers/address')
const router = express.Router()

router.get('/idUser', getAddressUser)

module.exports = router