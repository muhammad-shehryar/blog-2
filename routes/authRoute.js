const express = require("express")
const User = require("../config/models/User")
const router = express.Router();
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

router.post("/register",async(req,res)=>{
    const {name,email,password}=req.body;
    try{
    const user =   await User.findOne({email:email})
    if(user){
        return res.status(400).json({msg:"user already exits"})
    }
    const encrypted = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password , encrypted)
    
    const payload = {user:{id:req.user.id}}
    const token = jwt.sign(payload,process.env.JWT_SECRET_KEY,{expiresIn:"1h"})
    res.json({token:token})
    }catch(error){
        res.status(400).json("server aerrore")
    }
})


router.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({msg:"user not exits"})
        }
       const Npassword= await bcrypt.compare(password,user.password)
       if(!Npassword){
        return res.status(400).json({msg:"password not matched"})
       } 
       const payload = {
        user:{id:req.user.id}
       }
       const token = jwt.sign(payload,process.env.JWT_SECRET_KEY,{expiresIn:"1h"})
       res.json({token})

    }catch(error){
        res.status(400).json("error")
    }
})

module.exports = router;
