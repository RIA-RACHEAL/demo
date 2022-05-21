const expressAsyncHandler = require("express-async-handler");
const jwt=require("jsonwebtoken");
require("dotenv").config()

const adminLogin = (req,res)=>{
    let adminObj=req.body;
    
    if(adminObj.username!="admin"){
        res.send({message:"Invalid username"})
    }
    else if(adminObj.password!="admin"){
        res.send({message:"Invalid password"})
    }
    else{
        //create token
        let signedToken=jwt.sign({username:adminObj.username},process.env.SECRET,{expiresIn:100})
        //send token
        res.send({message:"success",token:signedToken,admin:"admin"} )
    }
}

const createProduct = expressAsyncHandler(async(req,res)=>{
    
    //get userCollection Obj from req
    let productCollectionObject = req.app.get("productCollectionObject");
    //consolo.log(req.body)
    //get new product obj
    let productObj = JSON.parse(req.body.productObj);
    //console.log(productObj);
    //add image CDN link to userObj
    productObj.productImage=req.file.path;

    //check for availabity of productId
    let productOfDB=await productCollectionObject.findOne({productId:productObj.productId})
    console.log(productOfDB)
    
    //if product already existed
    if(productOfDB!==null){
        res.status(200).send({message:"ProductId has already taken. Please choose another ProductId"})
    }
    
    //if product not existed
    else{
        
        //insert into user colelction
        let result=await productCollectionObject.insertOne(productObj)
        //send res
        res.status(201).send({message:"Product created"})
    }    
})

const getProducts= expressAsyncHandler(async(req,res)=>{

    //get productCollection Obj from req
    let productCollectionObject = req.app.get("productCollectionObject");

    //get product data from usercollection and pack them into an array
    let products = await productCollectionObject.find().toArray() 
    
    //send res
    res.status(200).send({message:"List of Products" ,payload:products})

})

const updateProduct = expressAsyncHandler(async(req,res)=>{
    
        //get usercollection obj from req
        let productCollectionObject=req.app.get("productCollectionObject");
        //console.log(req.body)
        //get modifies user obj
        let modifiedProductObj=req.body;
        //console.log(modifiedProductObj)
        //update userobj in usercollection
        let result=await productCollectionObject.updateOne({id:modifiedProductObj._id},{$set:{...modifiedProductObj}})
        //console.log(result)
        //send res
        if(result.modifiedCount==1){
            res.send({message:"User Modified successfully"})
        }
        else{
        res.send({message:"Error in user modification"})
        }
})


const deleteProduct = expressAsyncHandler(async(req,res)=>{
    
    //get usercollection obj from req
    let productCollectionObject = req.app.get("productCollectionObject");
    
    //get username from url
    let productFromUrl =   (+req.params.id);
    //console.log(productFromUrl)
    //get user by id from usercollection
    let result = await productCollectionObject.deleteOne({productId:productFromUrl})
    //console.log(result)
    //send res
    if(result.deletedCount==1){
        res.status(204).send({message:"Product removed"})
    }
    else{
        res.send({message:"Error in removing"})
    }

})

module.exports={adminLogin,createProduct,getProducts,updateProduct,deleteProduct}