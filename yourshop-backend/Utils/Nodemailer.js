import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendVerificationEmail = (user, token) => {
    const verificationUrl = `http://localhost:5173/verify/${token}`;
    

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Verify Your Email Address',
        html: `
            <p>Hello ${user.name},</p>
            <p>Thank you for registering with us! Please click the link below to verify your email:</p>
            <a href="${verificationUrl}">Verify Email</a>
        `,
    };


    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Verification email sent:', info.response);
        }
    });
};

export const sendPasswordResetEmail = (user, token) => {
    const resetPasswordUrl = `http://localhost:5173/Reset-Password/${token}`; 
   
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Password Reset Request',
        html: `
            <p>Hello ${user.name},</p>
            <p>We received a request to reset your password. If you didn't request this, please ignore this email.</p>
            <p>Click the link below to reset your password:</p>
            <a href="${resetPasswordUrl}">Reset Password</a>
        `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Password reset email sent:', info.response);
        }
    });
};