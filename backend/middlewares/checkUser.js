const checkUser=async(req,res,next)=>{
    
    //get userCollection Obj from req
    let userCollectionObject = req.app.get("userCollectionObject");
    console.log("userObj",userCollectionObject)
    //get new user obj and convert it into js ob
    console.log("Hi",req.body)
    let userObj=JSON.parse(req.body.userObj)
    console.log(userObj);

    //check for availabity of username
    let userOfDB=await userCollectionObject.findOne({username:userObj.username})
    console.log(userOfDB);
    //if user already existed
    if(userOfDB!==null){
        res.status(200).send({message:"Username has already taken. Please choose another username"})
    }
    else{
        next()
    }
}

module.exports= checkUser;