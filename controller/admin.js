const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-Product')
}


exports.postAddProduct = (req, res, next) => {
    const id = Math.floor(Math.random() * 1e10);
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;

    console.log(title, imageUrl, price)
    const newProduct = new Product(id, title, imageUrl, price)
    newProduct.save();
    // res.render('admin/addProduct')
}
exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit === "true";
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-Product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-Product',
      editing: editMode,
      product: product
    });
  });

} 

exports.getProduct = (req, res, next) =>{
    Product.fetchAll(products =>{
        res.render('admin/adminProduct',{prods : products})
    })
}

