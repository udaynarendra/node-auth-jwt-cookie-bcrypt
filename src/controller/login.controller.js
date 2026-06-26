import { loginValidation } from '../validators/validations.js';
import apiResponse from '../utility/apiResponse.js';
import { comparePassword } from '../utility/hashedPassword.js';
import User from '../models/users.models.js'
import { generateAccessToken, generateRefreshToken } from '../utility/tokens.js';
import RefreshToken from '../models/refreshToken.models.js';
import ApiError from '../utility/apiError.js';
import asyncHandler from '../utility/asyncHandler.js';


const login = asyncHandler(async (req, res) => {
    const validateData = await loginValidation.validateAsync(req.body);
    const user = await User.findOne({ email: validateData.email });
    if (!user) {
        throw new ApiError(404, 'user not found');
    }
    if (user.isVerified === false) {

        throw new ApiError(400, 'User Email not verified');
    }
    const isMatch = await comparePassword(validateData.password, user.password);
    if (!isMatch) {

        throw new ApiError(401, 'Invalid Credentials');
    }

    const accessToken = generateAccessToken(user._id, user.email, user.role);
    const refreshToken = generateRefreshToken(user._id);
    const refreshTokenData = await RefreshToken.create({
        userId: user._id,
        token: refreshToken,
        isRevoked: false,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json(apiResponse(true, 'login successfully', { accessToken }));

}
)

export default login;