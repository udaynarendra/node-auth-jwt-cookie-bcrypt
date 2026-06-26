import apiResponse from '../utility/apiResponse.js';
import EmailVerificationToken from '../models/emailVerificationTokens.models.js';




const verifyEmail = async (req, res) => {
    try {
        const token = req.query;
        const isExisting = await EmailVerificationToken.findOne(token);
        if (!isExisting) {
            return res.status(400).json(apiResponse(false, 'token doesnot exist'));
        }
        isExisting.isUsed = true;
        isExisting.save();
        return res.status(200).json(apiResponse(true, 'email sent successfully'));
    }
    catch (error) {
        return res.status(500).json(apiResponse(false, 'Internal Server error'));
    }
}
export default verifyEmail;