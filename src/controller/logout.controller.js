import verifyRefreshToken from "../utility/verifyToken.js"
import apiResponse from "../utility/apiResponse.js"
import RefreshToken from "../models/refreshToken.models.js"
import ApiError from "../utility/apiError.js"
import asyncHandler from "../utility/asyncHandler.js"
const logOut = asyncHandler(async (req, res) => {
    const token = req.cookies.refreshToken;
    const verifedToken = verifyRefreshToken(token);
    const tokenData = await RefreshToken.findOne({ token });
    if (!tokenData) {
        throw new ApiError(400, 'Token not found');
    }
    tokenData.isRevoked = true;
    await tokenData.save();
    res.clearCookie("refreshToken");
    return res.status(200).json(apiResponse(true, 'user logout successfully'));


})
export default logOut;