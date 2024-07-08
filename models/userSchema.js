const mongoose=require('mongoose')


const userschema=new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String},
    role:{type:String, enum:["admin","user"], default:"user"}
})

const userModel=mongoose.model('userCollection',userschema)

module.exports=userModel