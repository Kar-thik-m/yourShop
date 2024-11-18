import express from 'express';
import { usermodel } from '../Models/UserModel.js';
import bcrypt from "bcrypt"
import uploadFile from '../Middleware/uploadFile.js';
import getUrl from '../Utils/GenerateUrl.js';
import cloudinary from "cloudinary"
import { Authentication } from '../Middleware/Authentication.js';
import isValidEmail from '../Utils/isEmailvalid.js';
import sendToken from "../Utils/SendToken.js";
import { sendVerificationEmail,sendPasswordResetEmail } from '../Utils/Nodemailer.js';
import crypto from "crypto";
const userRouter = express.Router();


userRouter.post('/register', uploadFile, async (req, res) => {
    try {
        const payload = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const fileurl = getUrl(file);
        const cloud = await cloudinary.v2.uploader.upload(fileurl.content);

        if (!isValidEmail(payload.email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        const userCheck = await usermodel.findOne({ email: payload.email });
        if (userCheck) {
            return res.status(409).json({ message: "User already exists" });
        }


        const hash = await bcrypt.hash(payload.password, 10);
        const verificationToken = crypto.randomBytes(20).toString('hex');
        const userdata = new usermodel({
            ...payload,
            password: hash,
            userimage: { id: cloud.public_id, url: cloud.secure_url },
            verificationToken,
        });

        await userdata.save();
        sendVerificationEmail(userdata, verificationToken);
        sendToken(userdata, 201, res);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error registering user details' });
    }
});

userRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;


        const existingUser = await usermodel.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }


        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Incorrect password" });
        }


        sendToken(existingUser, 200, res);

    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({ message: "Error in logging in" });
    }
});

userRouter.get('/loaduser', Authentication, async (req, res) => {
    try {

        const finduser = await usermodel.findOne({ email: req.user.email });

        if (!finduser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(finduser);
    } catch (error) {

        res.status(500).json({ message: 'Internal server error' });
    }
});

userRouter.get('/verify/:token', async (req, res) => {
    try {
        const { token } = req.params;
        const user = await usermodel.findOne({ verificationToken: token });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired verification token' });
        }
        if (user.isVerified) {
            return res.status(200).json({ message: 'User is already verified' });
        }


        user.isVerified = true;
        user.verificationToken = undefined;

        await user.save();

        res.status(200).json({ message: 'User verified successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});





userRouter.post('/forgotpassword', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const user = await usermodel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }


        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetTokenExpiry = Date.now() + 3600000;


        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = resetTokenExpiry;

        await user.save();



        sendPasswordResetEmail(user, resetToken)

        res.status(200).json({ message: 'Password reset link has been sent to your email' });

    } catch (error) {
        console.error('Error in forgotpassword:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});


userRouter.post('/resetpassword/:token', async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;


        if (!newPassword) {
            return res.status(400).json({ message: 'New password is required' });
        }

        const user = await usermodel.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired reset token' });
        }


        const hashedPassword = await bcrypt.hash(newPassword, 10);


        user.password = hashedPassword;


        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.status(200).json({ message: 'Password has been reset successfully' });

    } catch (error) {
        console.error('Error in resetpassword:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});


userRouter.get('/logoutUser', async (req, res) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
        .status(200)
        .json({
            success: true,
            message: "Loggedout"
        })
})
export default userRouter;