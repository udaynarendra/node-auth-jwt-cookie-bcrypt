import Joi from 'joi';

const registerValidation=Joi.object({
    name:Joi.string()
    .trim()
    .lowercase()
    .min(3)
    .max(20)
    .required(),
    email:Joi.string()
    .trim()
    .lowercase()
    .email()
    .required(),
    password:Joi.string()
    .trim()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .required()
    .messages({
    "string.pattern.base":"password must contain uppercase,lowercase,number and special character"
}) 
});

const loginValidation=Joi.object({
email:Joi.string()
.lowercase()
.email()
.required(),
password:Joi.string()
.trim()
.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
.required()
.messages({
    "string.pattern.base":"password must contain uppercase,lowercase,number and special character"
}) 
});

const refreshTokenValidation=Joi.object({
    token:Joi.string()
    .trim()
    .required()
})


const forgotPasswordValidation=Joi.object({
    email:Joi.string
    .trim()
    .lowercase()
    .email()
    .required()
})

export {loginValidation,registerValidation,refreshTokenValidation,forgotPasswordValidation};