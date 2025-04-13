const fs = require('fs');
const path = require('path');
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
        getProductData((products => {
            if(this.id){
                const existingProduct = products.findIndex(prod => prod.id === this.id);
                if(existingProduct === -1){
                    products.push(this)
                    const data = JSON.stringify(products);
              fs.writeFile(p, data,(err)=>{
                if(err){
                    console.log(err)
                }else{
                    console.log('successfully saved')
                }
              })
              
                }else{
                  
                    console.log('product already exist')
                }
            }
        }))
    }

static fetchAll(cb){
    getProductData(cb);
}

static findById(id, cb){
getProductData((products)=>{
    const product = products.find(prod => prod.id == id)
cb(product);

})
}

}



