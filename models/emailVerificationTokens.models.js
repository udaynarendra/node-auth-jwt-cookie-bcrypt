import mongoose from 'mongoose';

const emailVerificationTokensSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    token: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    expiresAt: {
        type: Date,
        required: true,
        index: { expires: 0 }
    },
    isUsed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const EmailVerificationToken = mongoose.model("EmailVerificationToken", emailVerificationTokensSchema);

export default EmailVerificationToken;