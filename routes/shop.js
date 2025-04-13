const express = require('express');

const shopController = require('../controller/shop')
const router = express.Router(); 

router.get('/home',shopController.getHome);
router.get('/product',shopController.getProduct);
router.get('/product/:id',shopController.getProductById);
module.exports = router;