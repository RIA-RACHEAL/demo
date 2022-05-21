//create mini express app(card app)
const exp=require('express');
const createCart = require('../Controllers/cardController');
const cartApp=exp.Router();


//create users
cartApp.post('/create-cart',createCart);


//export userApp
module.exports=cartApp;
