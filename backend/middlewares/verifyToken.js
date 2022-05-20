const jwt=require("jsonwebtoken")
require("dotenv").config()

const verifyToken=(req,res,next)=>{

    //token verification logic
    //console.log(req.headers)
    let bearerToken=req.headers.authorization;

    //if req headers do not bearerToken
    if(bearerToken==undefined){
        res.send({message:"You are not authorized to access this info"})
    }
    else{
        //get token from bearerToken
        let token=bearerToken.split(" ")[1];
        //verify token
        jwt.verify(token,process.env.SECRET,(err,decodedToken)=>{
            //if token is expired
            if(err){
                res.send({message:"Session experied...relogin to continue..."})
            }
            //if token is not experied
            else{
                next()
            }
        })
    }
}

module.exports= verifyToken;