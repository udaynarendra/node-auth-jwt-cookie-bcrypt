import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        index: true,
        validate: {
            validator: (email) => {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/.test(email);
            },
            message: 'Invalid email format'
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: (password) => {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
            },
            message: `At least 8 characters,One uppercase letter (A-Z),One lowercase letter (a-z),One number (0-9),One special character (@ $ ! % * ? &, etc.)`
        }
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    lastLoginTime: {
        type: Date
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;