import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import asyncHandler from '../utility/asyncHandler.js';
import ApiError from '../utility/apiError.js';


const verify=asyncHandler((req,res,next)=>{
  const authHeader=req.headers.authorization;
  const token=authHeader.split(" ")[1];
    if(!token){
        throw new ApiError(401,'token not found')
    }
        const decoded=jwt.verify(token,process.env.ACCESS_TOKEN_SECERT);
        req.user=decoded;
        next();
  
})
export default verify;
