const express = require("express")
const router = express.Router()
const Post = require("../config/models/Post")

router.get("/",async(req,res)=>{
    try{
        const post = await Post.find().populate('author',['title','content'])
        const allpost = post.save()
        res.status(200).json(allpost)
    }catch(error){
        res.status(400).json({msg:"no post"})
    }
})

router.post("/",async(req,res)=>{
    const {title,content,author}=req.body;
    try{
        const newpost = await new Post({
            title:title,
            content:content,
            author:author,
        })
    let post = newpost.save()
    res.status(200).json(post)
    }catch(error){
        res.status(500).json("server error")
    }
})

router.get("/",async(req,res)=>{
    try{
        const post = await Post.find()
    if(!post){
        return res.status(200).json({msg:"no post"})
    }
        post = post.findById(req.params.id)
        let newpost = post.save()
        return res.status.json({newpost})
    }catch(error){
        res.status(400).json("errorL:"+error)
    }
    
})

router.post("/",async(req,res)=>{
    const {title,content}=req.body;
    try{
        let post = await Post.findById(req.params.id)
        if(!post){
            return post.status(400).json("no post")
        }
        post = await post.findByIdAndUpdate(req.params.id,{title,content},{new:true})
        let newpost = post.save()
        res.status(200).json(newpost)
    }catch(error){
        res.status(400).json({msg:"error"})
    }
})

router.delete("/",async(req,res)=>{
    try{
        let post = await Post.findById(req.params.id)
        if(!post){
            return res.status(200).json({msg:"no post"})
        }
        let newpost = post.remove()
        res.status(200).json("post deleted")
    }catch(error){
        res.status(500).json("error")
    }
   
})
module.exports = router;