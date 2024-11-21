import ms from "ms";
const sendToken = (user, statusCode, res) => {
    const token = user.getJwtToken();

    const cookieExpiryTime = ms(process.env.COOKIE_EXPIRES_TIME)
    const options = {
        expires: new Date(
            Date.now() + cookieExpiryTime),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'None',
    }

    res.status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token,
            user
        })


}
export default sendToken;

