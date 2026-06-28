import PasswordResetToken from "../models/passwordResetToken.models.js";
import asyncHandler from "../utility/asyncHandler.js";
import { resetPasswordValidation } from "../validators/validations.js";
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import ApiError from "../utility/apiError.js";
import apiResponse from "../utility/apiResponse.js";

const resetPassword=asyncHandler(async(req,res)=>{
    const validateData=await resetPasswordValidation.validateAsync(req.body);
    const hashedToken=crypto.createHash("sha256")
    .update(validateData.token)
    .digest("hex")
    const Token=await PasswordResetToken.findOne({token:hashedToken}).populate("userId");
    if(!Token){
        throw new ApiError(400,'Invalid Reset Token');
    }
    if(Date.now()>Token.expiresAt){
throw new ApiError(400,'reset token has expired');
    }
    const newHashedPassword=await bcrypt.hash(validateData.password,10);
    Token.isUsed=true;
    await Token.save();
    Token.userId.password=newHashedPassword;
    await Token.userId.save();
    
    await Token.deleteOne();
    return res.status(200).json(apiResponse(true,'Reset Password Successfully'));
})

export default resetPassword;