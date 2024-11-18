
import mongoose from 'mongoose';
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter name'],
    },
    email: {
        type: String,
        required: [true, 'Please enter email'],
        unique: true,

    },
    password: {
        type: String,
        required: [true, 'Please enter password'],

    },
    userimage: {
        id: String,
        url: String,
    },
    role: {
        type: String,
        default: 'user',
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Items',
        default: []
    }],
    verificationToken: {
        type: String,
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    }
});



userSchema.methods.getJwtToken = function () {
    return jwt.sign({ email: this.email }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME,
    });
};



export const usermodel = mongoose.model('User', userSchema);


