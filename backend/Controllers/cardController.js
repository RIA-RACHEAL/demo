const expressAsyncHandler = require("express-async-handler");


//create cart
const createCart = expressAsyncHandler(async (req, res) => {

    //get userCollection Obj from req
    let cartCollectionObject = req.app.get("cartCollectionObject");
    //console.log(req.body)
    //get new user obj
    let cartObj = req.body;
    //console.log("CP",cartObj.products)
    let products=cartObj.products
    //check for availabity of username
    let cartOfDB=await cartCollectionObject.findOne({username:cartObj.username})
    //console.log(cartOfDB)
    
    //if user already existed
    if(cartOfDB!==null){
        
        let result= await cartCollectionObject.updateOne({},{$set:{products}})
        //console.log("res",result)
        res.status(200).send({message:"Cart Producted updated"})
    }
    else{
    //insert into user colelction
    let result=await cartCollectionObject.insertOne(cartObj)
    //send res
    res.status(201).send({message:"Cart created"})
    }
})


//export 
module.exports=createCart;