const mongoose=require('mongoose')

const database=async (url)=>{
    try{
        await mongoose.connect(url)
        console.log("database connected");

    }catch(err){
        console.log(err);
    }

}
module.exports=database