import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

const generateAccessToken=(id,email,role)=>{
    return jwt.sign({id,email,role}
        ,process.env.ACCESS_TOKEN_SECERT
        ,{expiresIn:"15m"});

}

const generateRefreshToken=(id)=>{
        return jwt.sign({id}
        ,process.env.REFRESH_TOKEN_SECRET
        ,{expiresIn:"7d"});
}

export {generateAccessToken,generateRefreshToken};
