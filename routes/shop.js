const express = require('express');
const shopController = require('../controller/shop');
const router = express.Router();

// Home route (could be '/' depending on preference)
router.get('/', shopController.getHome);

// Product listing route
router.get('/product', shopController.getProduct);

// Product details route (by ID)
router.get('/product/:id', shopController.getProductById);

// Add product to cart route
router.post('/cart/add', shopController.postAddCart);

// View cart route
router.get('/cart/view', shopController.getCart);

// Delete product from cart route
router.post('/cart/delete', shopController.postDeleteCart);

module.exports = router;
