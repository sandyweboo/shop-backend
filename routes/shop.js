const express = require('express');

const shopController = require('../controller/shop')
const router = express.Router(); 

router.get('/home',shopController.getHome);
module.exports = router;