const express=require('express');
const userModel = require('../models/userSchema');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const userRouter=express.Router();

userRouter.post('/register',async(req,res)=>{
    const saltRound=10;
    const {name,email,password}=req.body;
    try{
        if(!name || !email ||  !password){
            return res.status(400).json({msg:"all fildes are required"})
        }
        const hashPassword=await bcrypt.hash(password,saltRound);
        const isUser=new userModel({name,email,password:hashPassword});
        await isUser.save();
        res.status(200).json({isUser})

    }catch(err){
        console.log(err);
        res.status(500).send("something went wrongs")

    }
})

userRouter.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await userModel.findOne({email});
        if(user){
            const isMatch=await bcrypt.compare(password,user.password)
            if(isMatch){
                const token=jwt.sign({id:user._id, email:user.email},'secretkey',{expiresIn:'1h'});
                res.status(200).json({msg:"login success",token})
            }else{
                res.status(400).send("password not match")
            }
        }else{
            res.status(400).send("user not found")
        }
    
    }catch(err){
        console.log(err);
        res.status(500).send("something went wrongs")

    }

})
module.exports=userRouter
