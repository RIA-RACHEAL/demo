const bcryptjs = require("bcryptjs");
const expressAsyncHandler = require("express-async-handler");
const jwt=require("jsonwebtoken");
require("dotenv").config()

//get users
const getUsers = expressAsyncHandler(async(req,res)=>{
    //console.log(req.headers)

    //get usercollection obj from req
    let userCollectionObject=req.app.get("userCollectionObject");
    //get users data from usercollection and pack them into an array
    let users = await userCollectionObject.find().toArray() 
    
    //send res
    res.status(200).send({message:"List of users" ,payload:users})

})

//get userby username
const getUserByUsername = expressAsyncHandler(async(req,res)=>{
    
    //get usercollection obj from req
    let userCollectionObject=req.app.get("userCollectionObject");
    
    //get username from url
    let usernameOfUrl =   req.params.username;
    //get user by id from usercollection
    let user = await userCollectionObject.findOne({username:usernameOfUrl})

    //send res
    res.send({message:"User data",payload:user})
    
})

//to create new user
const createUser = expressAsyncHandler(async (req, res) => {

    //get userCollection Obj from req
    let userCollectionObject = req.app.get("userCollectionObject");
    
    //get new user obj and convert it into js ob
    let userObj=JSON.parse(req.body.userObj)
    //console.log(userObj);
    //add image CDN link to userObj
    userObj.profilePic=req.file.path;    
    //console.log(userObj.profilePic);
    //check for availabity of username
    let userOfDB=await userCollectionObject.findOne({username:userObj.username})
    //console.log(userOfDB)
    
    //if user already existed
    if(userOfDB!==null){
        res.status(200).send({message:"Username has already taken. Please choose another username"})
    }
    
    //if user not existed
    else{
        //hash the password
        let hashedPassword= await bcryptjs.hash(userObj.password,5)
        //replace plain password woth hashed
        userObj.password=hashedPassword;
        //insert into user colelction
        let result=await userCollectionObject.insertOne(userObj)
        //send res
        res.status(201).send({message:"User created"})
    }
})

//login user
const loginUser = expressAsyncHandler(async(req,res)=>{
    //get userCollection Obj from req
    let userCollectionObject = req.app.get("userCollectionObject")
    //get user crederntials object
    let credObject = req.body;
    //console.log(credObject);
    //search user by username
    let userOfDB = await userCollectionObject.findOne({username:credObject.username})
    //console.log(userOfDB)
    //if user not found
    if(userOfDB===null){
        res.send({message:"Invalid username"})
    }   
    //if user existed, compare passwords 
    else{
        let status= await bcryptjs.compare(credObject.password,userOfDB.password)
        //if passeord not matched
        if(status==false){
            res.send({message:"Invalid password"})
        }
        else{
            //create JWT token and encrypt it with a secret key
            let signedToken = jwt.sign({username:userOfDB.username},process.env.SECRET,{expiresIn:200})
            //send encrypted JWT tojen as res
            res.send({message:"success",token:signedToken,user:userOfDB})
        }
    }

})

//update user
const updateUser = expressAsyncHandler(async(req,res)=>{
    
    //get usercollection obj from req
    let userCollectionObject=req.app.get("userCollectionObject");
    
    //get modifies user obj
    let modifiedUserObj=req.body;
    //update userobj in usercollection
    let result=await userCollectionObject.updateOne({username:modifiedUserObj.username},{$set:{...modifiedUserObj}})
    
    //send res
    if(result.acknowledged==true){
        res.send({message:"User Modified successfully"})
    }
    else{
    res.send({message:"Error in user modification"})
    }
})

const deleteUser = expressAsyncHandler(async(req,res)=>{
    
    //get usercollection obj from req
    let userCollectionObject = req.app.get("userCollectionObject");
    
    //get username from url
    let usernameFromUrl =   req.params.username;
    //get user by id from usercollection
    let result = await userCollectionObject.deleteOne({username:usernameFromUrl})

    //send res
    if(result.deletedCount==1){
        res.status(204).send({message:"User removed"})
    }
    else{
        res.send({message:"Error in removing"})
    }
     
})

const getProtectedInfo=(req,res)=>{
    res.send({message:"This is private message"})
}

module.exports={getUsers,getUserByUsername,createUser,updateUser,deleteUser,loginUser,getProtectedInfo};