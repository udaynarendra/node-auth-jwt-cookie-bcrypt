import { refreshTokenValidation } from '../validators/validations.js';
import apiResponse from '../utility/apiResponse.js';
import User from '../models/users.models.js'
import { generateAccessToken } from '../utility/tokens.js';
import RefreshToken from '../models/refreshToken.models.js';
import asyncHandler from '../utility/asyncHandler.js';
import ApiError from '../utility/apiError.js';


const refreshToken = asyncHandler(async (req, res) => {

    const validateData = await refreshTokenValidation.validateAsync(req.cookies.refreshToken);

    const refreshtoken = await RefreshToken.findOne({ token: validateData.refreshToken }).populate('userId');

    if (!refreshtoken) {
        throw new ApiError(400, 'Refresh Token Not Found');
    }
    if (refreshToken.isRevoked) {
        throw new ApiError(401, 'Refresh token has been revoked')
    }

    const user = refreshToken.userId;
    const newAccessToken = generateAccessToken(user._id, user.email, user.role);
    return res.status(200).json(apiResponse(true, 'accessToken created successfully', { newAccessToken }));
})
export default refreshToken;