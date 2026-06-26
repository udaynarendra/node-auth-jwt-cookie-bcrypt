import apiResponse from '../utility/apiResponse.js';
import EmailVerificationToken from '../models/emailVerificationTokens.models.js';
import asyncHandler from '../utility/asyncHandler.js';
import ApiError from '../utility/apiError.js';



const verifyEmail = asyncHandler(async (req, res) => {
    const token = req.query;
    const isExisting = await EmailVerificationToken.findOne(token);
    if (!isExisting) {
        throw new ApiError(400, 'token doesnot exist');
    }
    isExisting.isUsed = true;
    isExisting.save();
    return res.status(200).json(apiResponse(true, 'email sent successfully'));
})
export default verifyEmail;