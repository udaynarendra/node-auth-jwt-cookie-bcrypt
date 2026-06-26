import dotenv from 'dotenv';
dotenv.config();
import apiResponse from '../utility/apiResponse.js'
import jwt from 'jsonwebtoken';


const verify=(req,res,next)=>{
  const authHeader=req.headers.authorization;
  const token=authHeader.split(" ")[1];
    if(!token){
         return res.status(401).json({
            message:'No token found'
        })
    }
    try{
        const decoded=jwt.verify(token,process.env.ACCESS_TOKEN_SECERT);
        req.user=decoded;
        next();
    }
    catch(error){
        console.log(error.message)
       return  res.status(401).json(apiResponse(false,'user not verified'))
    }
}
export default verify;
