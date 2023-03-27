
const express = require('express')
const bcrypt = require('bcryptjs')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const UserModel = require('../model/user.model')
const userRoute = express.Router()



userRoute.post("/register",async(req,res)=>{
    const {email} =req.body
    
    // console.log(email) 
    try {
           const isPresent= await UserModel.findOne({email:email})  
           
           if(isPresent){
            res.status(201).send({"msg":"User already exist, please login"})
           }

           const hashPass = await  bcrypt.hash(req.body.password,5)
           const user = new UserModel({...req.body,password:hashPass})
           console.log(user)


           const result = await user.save()

           res.status(200).send({msg:"registration successfull...",
                                user:result
        })
        } catch (err) {
         res.status(400).send({error:err.message})
         
        }
        
    })
userRoute.post("/login",async(req,res)=>{
    
    const {email,password} = req.body
    try {
        const isPresent= await UserModel.findOne({email:email})  
        if(isPresent){
               const decoded = await bcrypt.compare(password,isPresent.password)
               if(decoded){

                const token = jwt.sign({userID:isPresent._id},process.env.privateKey,{expiresIn:"10hr"})

                res.status(200).send({"msg":"login success...",token})
            }else{
                   res.status(400).send({"err":"login failed..."})

               }

        }else{
            res.status(400).send({"err":"User does not exist, please register!"})

        }


    } catch (err) {
        res.status(400).send({error:err.message})
        
    }

})


module.exports=userRoute