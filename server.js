const fs = require('fs');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop');


const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');
//const errorController = require('./controllers/error');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin',adminRoutes)
app.use(shopRoutes);

app.listen(3000,()=>{
    console.log('server is running on port 3000')
});
