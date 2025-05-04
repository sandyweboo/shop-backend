const Cart = require('../models/cart');
const Product = require('../models/product');

exports.getHome = (req, res, next) => {
    res.send('Homepage loaded');
};

exports.getProduct = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/product', { product: products });
    });
};

exports.getProductById = (req, res, next) => {
    const prodId = req.params.id;
    Product.findById(prodId, product => {
        res.render('shop/singleProduct', { product: product });
    });
};

exports.postAddCart = (req, res, next) => {
    const id = req.body.productId;
    const producPrice = req.body.productPrice;
    Cart.addProduct(id, producPrice);
    res.redirect('/cart/view');
};

exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
        res.render('shop/cart', { cart: cart });
    });
};

exports.postDeleteCart = (req, res, next) => {
    const id = req.body.productId;
   Product.findById(id, product =>{
    Cart.deleteCartProduct(id, product.Price);
    res.redirect('/cart/view');
   }

   )
   
};
