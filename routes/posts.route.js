const express = require('express')
const bcrypt = require('bcryptjs')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const PostModel = require('../model/post.model')
const auth = require('../middleware/auth.middle')

const postRoute = express.Router()

postRoute.get("/",async(req,res)=>{

    const {min,max} = req.query
    let query={}

    if(min){
        query.no_of_comments={$gte:+min}
    }
    if(max){
        if(query.no_of_comments.$gte){

            query.no_of_comments.$lte=+max
        }
    }
    console.log(query)
    const {userID} = req.body
    try {
        
        const posts = await PostModel.find({userID:userID})
        if(posts.length>0){
            if(min&& max){

                const post  = await PostModel.find({no_of_comments:{$gte:+min,$lte:+max}}).limit(3)
                res.status(200).send({data:post,
                msg:"data recieved"})
            }else{
                res.status(200).send({data:posts,
                msg:"data recieved"})

            }
        }else{
            res.status(400).send({msg:"this user does not have any post"})
        }
        console.log(posts)
    } catch (err) {
        res.status(400).send({error:err.message})
        
    }
    
})
postRoute.post("/add",async(req,res)=>{
    // console.log(req.body)
    // const userId = req.body
    try {
        
        const post = new PostModel(req.body)

        const result = await post.save()

        
            res.status(200).send({data:result,
            msg:"posted..."})
       
           
        // console.log(posts)
    } catch (err) {
        res.status(400).send({error:err.message})
        
    }
    
})
postRoute.get("/top",async(req,res)=>{
    const {userID}=req.body
    try {
        
        const post = await PostModel.find({userID:userID}).sort({no_of_comments:-1}).limit(3)
         res.status(200).send({data:post,
            msg:"posted..."})
       
           
        // console.log(posts)
    } catch (err) {
        res.status(400).send({error:err.message})
        
    }
    
})

// update 

postRoute.patch("/update/:id",async(req,res)=>{
    const {id} =req.params
    try {
        const post = await PostModel.findByIdAndUpdate({_id:id},req.body)
        console.log(post)
        res.status(200).send({"msg":"post updated successfully..."})
        
    } catch (err) {
        res.status(400).send({error:err.message})
        
    }
})
postRoute.delete("/delete/:id",async(req,res)=>{
    const {id} =req.params
    try {
        const post = await PostModel.findByIdAndDelete({_id:id})
        console.log(post)
        res.status(200).send({"msg":"post has been deleted"})
        
    } catch (err) {
        res.status(400).send({error:err.message})
        
    }
})


module.exports=postRoute