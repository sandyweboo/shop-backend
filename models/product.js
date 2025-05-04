const fs = require('fs');
const path = require('path');
const Cart = require('./cart');
const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
);

const getProductData = cb => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([])
        } else {
            cb(JSON.parse(fileContent));
        }
    })
}

module.exports = class Product {
    constructor(id, title, img, price) {
        this.id = id
        this.title = title;
        this.img = img;
        this.price = price;
        //extra detail need here
    }


    save() {
        getProductData((products) => {
            if (this.id) {
                const existingProductIndex = products.findIndex(
                    prod => String(prod.id) === String(this.id)
                );
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;

                fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                    if (err) console.log(err);
                });
            } else {
                //console.log("passs")

                this.id = Math.floor(Math.random() * 1e10);
                products.push(this)
                fs.writeFile(p, JSON.stringify(products), err => {
                    if (err) console.log(err);
                });
            }
        });
    }


    static fetchAll(cb) {
        getProductData(cb);
    }

    static deleteById(id) {
        getProductData((products) => {
            const product = products.find(prod => prod.id == id);
            //console.log(product );
            if (!product) {
                console.log("Product not found. Cannot delete.");
                return;
            }

            const updatedProducts = products.filter(prod => prod.id != id);
            //console.log(updatedProducts);
            fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                if (!err) {
                    Cart.deleteCartProduct(id, product.price);
                } else {
                    console.log("Error writing to file:", err);
                }
            });
        });
    }


    static findById(id, cb) {
        getProductData((products) => {
            const product = products.find(prod => prod.id == id)
            cb(product);

        })
    }

}



