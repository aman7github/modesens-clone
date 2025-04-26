

const express = require("express")
const { Ordermodel } = require("../model/Order.model")
const orderapp = express.Router()
const jwt = require("jsonwebtoken")

orderapp.post("/add",async(req,res)=>{
    //const token = req.headers.authorization
try{
   
        



if(req.body.length==1){

    // <--why I add and delete userID because if data buy direct then it dont have userID because singleproduct page open without login its means that product did not get userid on post so we are adding userid from backed 
    //BUT if single data comes from cart so userID already added to that product if we dont remove it will be duplicate key error-------->
   
                let postdata = req.body[0]
                delete postdata.userID
                postdata.userID = req.body.userID
                const newdata = new Ordermodel(postdata)
                await newdata.save()
               const data = await Ordermodel.find({"userID":req.body.userID})
               res.status(200).send({"msg":"new data is added","data":data})
   
           }else if(req.body.length>1){
               
               await Ordermodel.insertMany(req.body)
               const data = await Ordermodel.find({"userID":req.body.userID})
               res.status(200).send({"msg":"new data is added","data":data})
           }


}catch(err){
    res.status(400).send({"msg":err.message})
}
})


orderapp.get("/get",async(req,res)=>{
  
   // const token = req.headers.authorization

try{
    

    const data = await Ordermodel.find({"userID":req.body.userID})
    res.status(200).send({"msg":data})
}catch(err){
    res.status(400).send({"msg":err.message})
}

})





module.exports={
    orderapp
}