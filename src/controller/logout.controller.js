import verifyRefreshToken from "../../../utility/verifyToken.js"
import apiResponse from "../../../utility/apiResponse.js"
import RefreshToken from "../models/refreshToken.models.js"
const logOut=async(req,res)=>{
    try{
    const token=req.cookies.refreshToken;
    console.log(token)
    const verifedToken=verifyRefreshToken(token);
    const tokenData=await RefreshToken.findOne({token});
    if(!tokenData){
        return res.status(400).json(apiResponse(false,'token not found'));
    }
    tokenData.isRevoked=true;
    await tokenData.save();
    console.log(tokenData)
    res.clearCookie("refreshToken");
    return res.status(200).json(apiResponse(true,'user logout successfully'));
}
catch(error){
    return res.status(401).json(apiResponse(false,'unauthorized'));
}

}
export default logOut;