import { refreshTokenValidation } from '../validators/validations.js';
import apiResponse from '../utility/apiResponse.js';
import User from '../models/users.models.js'
import { generateAccessToken } from '../utility/tokens.js';
import RefreshToken from '../models/refreshToken.models.js';


const refreshToken = async (req, res) => {
    try {
        const validateData = await refreshTokenValidation.validateAsync(req.cookies);
        const refreshtoken = await RefreshToken.findOne({ token: validateData.refreshToken }).populate('userId');
        if (!refreshtoken) {
            res.status(400).json(apiResponse(false, 'refresh token  not found'));
        }
        const user = refreshToken.userId;
        const newAccessToken = generateAccessToken(user._id, user.email, user.role);
        return res.status(200).json(apiResponse(true, 'accessToken created successfully', { newAccessToken }));
    }
    catch (error) {
        return res.status(500).json(apiResponse(false, 'Internal Server Error'));
    }
}
export default refreshToken;