import jwt from 'jsonwebtoken';


const verify=(req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        res.status(401).json({
            message:'No token'
        })
    }
    try{
        const decoded=jwt.verify(token,'give your screte password');
        req.user=decoded;
        next();
    }
    catch(error){
        res.status(401).json({
            message:'not verified'
        })
    }
}
export default verify;