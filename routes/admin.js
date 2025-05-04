const express = require('express');

const adminController = require('../controller/admin');
const router = express.Router();

router.get('/add-products', adminController.getAddProduct);

router.get('/edit-product/:productId', adminController.getEditProduct);
router.get('/get-product', adminController.getProduct);
router.post('/add-product', adminController.postAddProduct);
router.post('/edit-product', adminController.postEditProduct);
module.exports = router;
