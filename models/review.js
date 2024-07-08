const mongoose=require('mongoose')

const reviewSchema=new mongoose.Schema({
    customerId:{type:Number},
    bookId:{type:String},
    review:{type:String},

})
const reviewModel=mongoose.model('reviewCollection',reviewSchema)
module.exports=reviewModel