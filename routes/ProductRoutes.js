const ProductCtrl = require('../controller/ProductCtrl')

const router = require('express').Router()

router.route('/product')
    .get(ProductCtrl.getProducts)
    .post(ProductCtrl.createProduct)
    
router.route('/product/:id')
    .put(ProductCtrl.updateProduct)
    .delete(ProductCtrl.deleteProduct)

module.exports = router