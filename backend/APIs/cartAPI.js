//create mini express app(card app)
const exp=require('express');
const cartApp=exp.Router();
const {createCart,viewCart, deleteProduct} = require('../Controllers/cartController');



//create cart
cartApp.post('/create-cart',createCart);

//view cart
cartApp.get('/view-cart/:username',viewCart)

//remove product by id
cartApp.delete('/delete/:id',deleteProduct)



//export userApp
module.exports=cartApp;
