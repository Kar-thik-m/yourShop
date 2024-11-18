import { usermodel } from "../Models/UserModel.js";

import jwt from "jsonwebtoken"

export const Authentication = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(('Login first to handle this resource', 401))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await usermodel.findOne({ email: decoded.email });


    if (!req.user) {
        return res.status(404).json({ message: 'User not found' });
    }

    next();
}

