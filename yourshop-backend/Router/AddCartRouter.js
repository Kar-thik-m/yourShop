
import express from 'express';
import { usermodel } from "../Models/UserModel.js";
import { AddCartModel } from "../Models/AddcartModel.js";
import { ItemsModel } from "../Models/ItemModel.js";
import { Authentication } from "../Middleware/Authentication.js";

const Addcartrouter = express.Router();

Addcartrouter.post('/addToCart', Authentication, async (req, res) => {
    const { productId, quantity = 1 } = req.body;

    try {
        const userId = req.user._id
        const user = await usermodel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const product = await ItemsModel.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }


        let cart = await AddCartModel.findOne({ user: userId });

        if (!cart) {

            cart = new AddCartModel({
                user: userId,
                products: [{ product: productId, quantity }],
            });
            await cart.save();
            await cart.calculateTotalPrice();
            return res.status(201).json({ message: "Product added to cart", cart });
        }

        const existingProductIndex = cart.products.findIndex(item => item.product.toString() === productId);

        if (existingProductIndex !== -1) {

            cart.products[existingProductIndex].quantity += quantity;
        } else {

            cart.products.push({ product: productId, quantity });
        }


        await cart.calculateTotalPrice();
        await cart.save();

        return res.status(200).json({ message: "Product added to cart", cart });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
});







Addcartrouter.get('/getaddCart', Authentication, async (req, res) => {
    const userId = req.user._id;
    try {

        const cart = await AddCartModel.findOne({ user: userId })
            .populate("products.product");

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        return res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
});



Addcartrouter.delete('/removeFromCart', Authentication, async (req, res) => {
    const { productId } = req.body;
    const userId = req.user._id;

    try {

        const cart = await AddCartModel.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }


        const productIndex = cart.products.findIndex(item => item.product.toString() === productId);

        if (productIndex === -1) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        cart.products.splice(productIndex, 1);


        await cart.calculateTotalPrice();
        await cart.save();

        return res.status(200).json({ message: "Product removed from cart", cart });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
});




export default Addcartrouter;