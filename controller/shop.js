const Product = require('../models/product');

exports.getHome = (req, res, next) => {
   
    res.send('Homepage loaded'); // or res.json(), or res.render()
 };
 
 exports.getProduct = (req, res, next) =>{
Product.fetchAll(products =>{
    res.render('shop/product',{product : products })
})

 }

 exports.getProductById = (req, res, next)=>{
const prodId = req.params.id;
Product.findById(prodId, product=>{
    res.render('shop/singleProduct',{product : product})
})
console.log(prodId)

 }