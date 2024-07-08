const mongoose=require('mongoose')

const bookschema=new mongoose.Schema({
    
    title:{type:String},
    author:{type:String},
    description:{type:String}
})
const bookModel=mongoose.model('bookCollection',bookschema)

module.exports=bookModel
