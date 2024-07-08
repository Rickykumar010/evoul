require ('dotenv').config()
const express=require('express')
const database = require('./configs/db')
const userRouter = require('./routers/userRouter')
const bookRouter = require('./routers/bookRouter')

const app=express()

app.use(express.json())
app.use(userRouter)
app.use(bookRouter)
const port=process.env.port


app.listen(port,async()=>{
    try{
        await database(process.env.mongodb_url)
        console.log("server is running at port 3000");
    }catch(err){
        console.log(err);
    }
    
})