import PasswordResetToken from "../models/passwordResetToken.models.js";
import User from "../models/users.models.js";
import ApiError from "../utility/apiError.js";
import apiResponse from "../utility/apiResponse.js";
import asyncHandler from "../utility/asyncHandler.js";
import { sendPasswordResetEmail } from "../utility/email.js";
import { forgotPasswordValidation } from "../validators/validations.js";
import crypto from 'crypto';

const forgotPassword=asyncHandler(async(req,res)=>{
    const validateData=await forgotPasswordValidation.validateAsync(req.body);
    const user=await User.findOne({email:validateData.email});
    if(!user){
        throw new ApiError(404,'Email Not found');
    }
    const token=crypto.randomBytes(32).toString("hex");
    const hashedToken=crypto.createHash("sha256")
    .update(token)
    .digest("hex");
    const createToken=await PasswordResetToken.create({
        userId:user._id,
        token:hashedToken,
        expiresAt:new Date(Date.now()+24*60*60*1000)
    });
    sendPasswordResetEmail(user.email,token);
    return res.status(200).json(apiResponse(true,'ResponseOk'))
})
export default forgotPassword;