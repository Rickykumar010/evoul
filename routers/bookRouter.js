const express=require('express');
const bookModel = require('../models/book');
const role = require('../middleware/role');

const bookRouter=express.Router();


bookRouter.get("/books", async(req,res)=>{
    try{
        const {page=1,limit=10, sortBy='title', order='asc', search=''}=req.query;
        const query={
            $or:[
                {title:{$regex:search, $options:'i'}},
                {author:{$regex:search, $options:'i'}},
                {description:{$regex:search, $options:'i'}}
            ]
        };
        const sortOrder=order=='desc'?-1 : 1;
        const isBook=await bookModel.find(query)
        .sort({[sortBy]:sortOrder})
        .limit(parseInt(limit))
        .skip((page-1)*limit);

        const totalBooks=bookModel.countDocuments(query);
        res.json({
            totalBooks:Math.ceil(totalBooks/limit),
            currentPage:parseInt(page),
            isBook
        });
    }catch(err){
        console.log(err);
    }
})

bookRouter.get('/books/:id',async(req,res)=>{
    try{
        const isBook=await bookModel.find();
        res.json({isBook})

    }catch(err){
        console.log(err);
    }
})

bookRouter.post("/books",role(['admin']), async(req,res)=>{
    try{
        const isBook=new bookModel(req.body);
        await isBook.save();
        res.status(200).json({isBook})
    }catch(err){
        console.log(err);
        res.status.json({msg:"not found"})
    }
})


bookRouter.delete('/books/:id', role(['admin'], async(req,res)=>{
    try{
        const isBook= await bookModel.findByIdAndDelete(req.params.id);
        if(!isBook){
            return res.status(404).json({msg:"book not found"})
        }
        res.json({isBook})

    }catch(err){
        console.log(err)
    }
}))
module.exports= bookRouter;
