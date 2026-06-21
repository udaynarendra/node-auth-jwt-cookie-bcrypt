import mongoose from 'mongoose';

const passwordResetTokenSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    token:{
        type:String,
        required:true,
        trim:true
    },
    expiresAt:{
        type:Date,
        required:true,
        index:{expires:true}
    },
    isUsed:{
        type:Boolean,
        default:false
    }

},{timestamps:true});

const PasswordResetToken=mongoose.model('PasswordResetToken',passwordResetTokenSchema);
export default PasswordResetToken;