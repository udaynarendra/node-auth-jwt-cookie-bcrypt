import { registerValidation } from '../validators/validations.js';
import apiResponse from '../utility/apiResponse.js';
import { hashedPassword } from '../utility/hashedPassword.js';
import User from '../models/users.models.js'
import { sendVerificationEmail } from '../utility/email.js';
import EmailVerificationToken from '../models/emailVerificationTokens.models.js';


const register = async (req, res) => {
    try {
        const validateData = await registerValidation.validateAsync(req.body);
        const userExisting = await User.findOne({ email: validateData.email });
        if (userExisting) {
            return res.status(400).json(apiResponse(false, 'user already exists'));
        }
        const hashPassword = await hashedPassword(validateData.password);

        const verificationToken = crypto.randomUUID();
        const createUser = await User.create({
            name: validateData.name,
            email: validateData.email,
            password: hashPassword
        });
        const user = await User.findOne({ email: validateData.email });
        await EmailVerificationToken.create({
            userId: user._id,
            token: verificationToken,
            expiresAt: new Date(
                Date.now() + 24 * 60 * 60 * 1000
            )
        });
        await sendVerificationEmail(validateData.email, verificationToken);
        return res.status(201).json(apiResponse(true, 'user created successfully', createUser));
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(apiResponse(false, 'Internal server error'));
    }
}

export default register;
