import { registerValidation } from '../validators/validations.js';
import apiResponse from '../utility/apiResponse.js';
import { hashedPassword } from '../utility/hashedPassword.js';
import User from '../models/users.models.js'
import { sendVerificationEmail } from '../utility/email.js';
import EmailVerificationToken from '../models/emailVerificationTokens.models.js';
import ApiError from '../utility/apiError.js';
import asyncHandler from '../utility/asyncHandler.js';


const register =asyncHandler(async (req, res) => {
        const validateData = await registerValidation.validateAsync(req.body);
        const userExisting = await User.findOne({ email: validateData.email });
        if (userExisting) {
            throw new ApiError(400,'user already exists');
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
})

export default register;
