const Product = require('../models/product')

exports.getAddProduct = (req, res, next)=>{
res.render('admin/addProduct')
}

exports.postAddProduct = (req, res, next)=>{
    const id = Math.floor(Math.random() * 1e10);
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;

    console.log(title, imageUrl, price)
const newProduct  = new Product(id,title, imageUrl, price)
newProduct.save();
   // res.render('admin/addProduct')
    }
    