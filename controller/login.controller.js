import { loginValidation } from '../validators/validations.js';
import apiResponse from '../utility/apiResponse.js';
import { comparePassword } from '../utility/hashedPassword.js';
import User from '../models/users.models.js'
import { generateAccessToken, generateRefreshToken } from '../utility/tokens.js';
import RefreshToken from '../models/refreshToken.models.js';


const login = async (req, res) => {
    try {
        const validateData = await loginValidation.validateAsync(req.body);
        const user = await User.findOne({ email: validateData.email });
        if (!user) {
            return res.status(404).json(apiResponse(false, 'user not found'));
        }
        if (user.isVerified === false) {

            return res.status(400).json(apiResponse(false, 'User Email not verified'))
        }
        const isMatch = await comparePassword(validateData.password, user.password);
        if (!isMatch) {
            return res.status(400).json(apiResponse(false, 'Invalid Creditionals'));
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
    } catch (error) {
        console.log(error.message)
        return res.status(500).json(apiResponse(false, 'Internal Server Error'));
    }
}

export default login;