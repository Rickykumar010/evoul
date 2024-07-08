const jwt = require('jsonwebtoken');


const auth=async(req,res,next)=>{
    try{
        const token=req.header.authorization?.split(" ")[1];
        if(token){
            jwt.verify(token,'secret', (err,decoded)=>{
                if(decoded){
                    console.log(decoded);
                    next();
                }else{
                    res.json({message:"invalide token"});
                }
            });
        }else{
            return res.status(401).json({message:"no token found, please login first"};)
        }

    }catch(err){
        console.log(err);
        return res.status(500).json({message:"something wrongs"})
    }
}
module.exports={auth};