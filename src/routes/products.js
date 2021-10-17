const express = require('express')
const router = express.Router()
const middles = require('../middlewares/products')
const { productList, putProduct, deleteProduct, postProduct } = require('../controllers/products')

//Listado de products
router.get('/', middles.validate_started_session, productList)

//El Admin puede crear un nuevo product
router.post('/', middles.validate_started_session, middles.validate_admin, middles.validate_data_body , postProduct)

//El Admin puede modificar un product pasado por parametro
router.put('/:idProduct', middles.validate_started_session, middles.validate_admin, middles.validate_id_product, middles.validate_data_body, putProduct)

//El Admin puede eliminar un product pasado por parametro
router.delete('/:idProduct', middles.validate_started_session, middles.validate_admin, middles.validate_id_product, deleteProduct) 


module.exports = router