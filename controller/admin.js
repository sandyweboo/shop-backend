const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-Product', {
    editing: false
  })
}


exports.postAddProduct = (req, res, next) => {

  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const newProduct = new Product(null, title, imageUrl, price)
  newProduct.save();
}

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit === "true";
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  //console.log(prodId)
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

exports.getProduct = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/adminProduct', { prods: products })
  })
}

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;

  const updatedProduct = new Product(
    prodId,
    updatedTitle,
    updatedImageUrl,
    updatedPrice
  );
  updatedProduct.save();
  res.redirect('/product');
};

exports.deletePostProduct(req, res, next)=>{
  
}