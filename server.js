//create express app
const exp=require("express");
const app=exp();
const path=require("path")
require("dotenv").config()


//connecting with Angular app
app.use(exp.static(path.join(__dirname,'./dist/mean-app')))

//Connecting to MONGODB SERVER
//import MongoClient
const mongoClient=require("mongodb").MongoClient;
const dburl= process.env.DBURL;

//connect to DB
mongoClient.connect(dburl)
.then((client)=>{
    //get database  object
    let databaseObject=client.db("CDB22DX009DB");
    //get collecetion objects
    let userCollectionObject=databaseObject.collection("usercollection");
    let productCollectionObject=databaseObject.collection("productcollection")
    let cartCollectionObject=databaseObject.collection("cartcollection");
    //share collection objects to APIs
    app.set("userCollectionObject",userCollectionObject)
    app.set("productCollectionObject",productCollectionObject)
    app.set("cartCollectionObject",cartCollectionObject)

    console.log("Connected to DB succesfully")
})
.catch(err=>console.log("err in connecting to Database",err))


//import apis
const userApp=require("./backend/APIs/userAPI")
const adminApp=require("./backend/APIs/adminAPI")
const cartApp=require('./backend/APIs/cartAPI')

//add body par
app.use(exp.json())

//if path is user, then execute userAPIs
app.use('/user',userApp)

//if path is admin, then execute adminAPIs
app.use('/admin',adminApp)

//if path is admin, then execute adminAPIs
app.use('/cart',cartApp)

app.use('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'./dist/mean-app/index.html'),err=>{
        if(err){
            next(err)
        }
    })
})

//handling invalid paths
app.use((req,res,next)=>{
    res.status(404).send({message:`The path ${req.url} does not exist`})
})

//handling errors
app.use((err,req,res,next)=>{
    res.status(500).send({message:err.message})
})

//assign port number
const PORT=4000 || process.env.PORT;
app.listen(PORT,()=>console.log(`HTTP Server Listening to ${PORT}`))