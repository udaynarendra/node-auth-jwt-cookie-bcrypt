import dotenv from 'dotenv';
dotenv.config();

import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.USER_EMAIL,
        pass:process.env.APP_PASSWORD
    }
});



const sendVerificationEmail=async(email,token)=>{
    const verificationUrl=`${process.env.CLIENT_URL}/verifyEmail?token=${token}`;
    await transporter.sendMail({
        from:process.env.USER_EMAIL,
        to:email,
        subject:'verify your email',
        html:`
        <h2>Email Verification</h2>
        <p>Click the button below to verify your account</p>
        <a href=${verificationUrl}>Verify Email</a>
        <p>This link will be expire in 24 hours</p>
        `
    });
};

const sendPasswordResetEmail=async(email,token)=>{
    const resetUrl=`${process.env.CLIENT_URL}resetPassword?token=${token}`;
    await transporter.sendMail({
        from:process.env.USER_EMAIL,
        to:email,
        subject:'password Reset ',
        html:`<h2>password Reset</h2>
        <p>Click the button below to reset your password</p>
        <a href=${resetUrl}>Reset Password</a>
        <p>This link will be expire in 24 hours</p>`
    })
}

export {sendPasswordResetEmail,sendVerificationEmail};