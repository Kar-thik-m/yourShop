import express from 'express';
import { ItemsModel } from '../Models/ItemModel.js';
import { Authentication } from '../Middleware/Authentication.js';
import { usermodel } from '../Models/UserModel.js';

const Whishrouter = express.Router();

Whishrouter.post('/addwhishlist/:id', Authentication, async (req, res) => {
    try {
        const productId = req.params.id;
        const userId = req.user._id;

        const product = await ItemsModel.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }


        const user = await usermodel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }


        if (user.wishlist.includes(productId)) {
            return res.status(400).json({ message: 'Product is already in your wishlist' });
        }


        user.wishlist.push(productId);
        await user.save();

        res.status(200).json({ message: 'Product added to wishlist', wishlist: user.wishlist });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


Whishrouter.post('/removewhishlist/:id', Authentication, async (req, res) => {
    const productId = req.params.id;
    const userId = req.user._id;

    try {
        const product = await ItemsModel.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const user = await usermodel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }


        const productIndex = user.wishlist.indexOf(productId);
        if (productIndex === -1) {
            return res.status(404).json({ message: 'Product not found in wishlist' });
        }


        user.wishlist.splice(productIndex, 1);
        await user.save();

        res.status(200).json({ message: 'Product removed from wishlist', wishlist: user.wishlist });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

Whishrouter.get('/getwishlist', Authentication, async (req, res) => {
    try {
        const userId = req.user._id;


        const user = await usermodel.findById(userId).populate('wishlist');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }


        res.status(200).json(user.wishlist);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default Whishrouter;
