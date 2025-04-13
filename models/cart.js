const fs = require('fs');
const path = require('path');
const Product = require('./product');
const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);

module.exports = class Cart{
     static addProduct(id, productPrice){
        fs.readFile(p,(err, fileContent)=>{

            //1 if dosent exist create empty cart object;
            let cart = {
                product :[],
                totalPrice  :0,
            }
           if(!err){
            cart = JSON.parse(fileContent); //2 if there no error return data as js object
           } 
           const existingProductIndex = cart.product.findIndex(prod => prod.id === id); //3 if there have any product in cart find which index produt have in there
           const existingProduct = cart.product[existingProductIndex]; //4 find the  actual product from product array
           let updateProduct; //5 make update product varable

           if(existingProduct){
            updateProduct = {...existingProduct} //6 make copy of existing product
            updateProduct.qty = updateProduct.qty + 1; // 7if already have then increase the quantity
          
        cart.product = [...cart.product] // make clone of product 
        cart.product[existingProductIndex] = updateProduct; // and update using index number in array updated product details

        }else{
            updateProduct = {id : id, qty : 1} // if it is not there add new produc in to product array
            cart.product = [...cart.product, updateProduct];
        }
cart.totalPrice = cart.totalPrice+ +productPrice;
fs.writeFile(p,JSON.stringify(cart),err=>{
    console.log(err);
})
       })
     }

     static deleteProduct(id, productPrice){
        fs.readFile(p,(err, fileContent)=>{
            if(err){
                return;
            }
            const cart = JSON.parse(fileContent);
            const product = cart.product.find(prod => prod.id === id);
            const productQty = product.qty;
            const updateProduct = cart.product.filter(prod => prod.id !== id);
            const totalPrice = cart.totalPrice - productPrice * productQty;
            fs.writeFile(p,JSON.stringify({product : updateProduct, totalPrice : totalPrice}),err=>{
                console.log(err);
            })
        })
     }
     static getCart(cb){
        fs.readFile(p,(err, fileContent)=>{
            const cart = JSON.parse(fileContent);
            if(err){
                cb(null);
            }else{
                cb(cart);
            }
        })
     }
}