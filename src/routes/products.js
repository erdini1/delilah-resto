const express = require('express')
const router = express.Router()
const middles = require('../middlewares/products')
const { productList, putProduct, deleteProduct, postProduct, modifyProductPrice } = require('../controllers/products')
const { verify_disabled } = require('../middlewares/users')

//Listado de products
router.get('/', middles.validate_started_session, verify_disabled, middles.cacheGet,  productList)

//El Admin puede crear un nuevo product
router.post('/', middles.validate_started_session, middles.validate_admin, verify_disabled, middles.validate_data_body , postProduct)

//El Admin puede modificar un product pasado por parametro
router.put('/:idProduct', middles.validate_started_session, middles.validate_admin, verify_disabled,  middles.validate_id_product, middles.validate_data_body, putProduct)

//El Admin puede eliminar un product pasado por parametro
router.delete('/:idProduct', middles.validate_started_session, middles.validate_admin, verify_disabled, middles.validate_id_product, deleteProduct) 

//El admin puede modificar el precio de un producto y borrar su cache automaticamente
router.put('/:idProduct/price', middles.validate_started_session, middles.validate_admin, verify_disabled, middles.validate_id_product, modifyProductPrice)

module.exports = router