

const express = require('express');
const bodyParser = require('body-parser');
const shopRoutes = require('./routes/shop');

const app = express();
//const errorController = require('./controllers/error');
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/shop',shopRoutes);


app.listen(3000,()=>{
    console.log('server is running on port 3000')
})
