import express from 'express';
import { Authentication } from '../Middleware/Authentication.js';
import { usermodel } from '../Models/UserModel.js';
import { Order } from '../Models/OrderModel.js';

const Oderrouter = express.Router();

Oderrouter.post('/createorder', Authentication, async (req, res) => {
    try {
        const { products, shippingAddress, paymentInfo } = req.body;
        const userId = req.user._id;
        const user = await usermodel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

       
        const newOrder = new Order({
            user: userId,
            products: products,
            shippingAddress: shippingAddress,
            paymentInfo: paymentInfo,
        });

        await newOrder.save();

        res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

Oderrouter.get('/userorders', Authentication, async (req, res) => {
    try {
        const { userId } = req.params;

        const orders = await Order.find({ user: userId }).populate('products.product');
        if (!orders.length) {
            return res.status(404).json({ message: 'No orders found for this user' });
        }

        res.status(200).json({ orders });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

Oderrouter.get('/order/:orderId',Authentication, async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findById(orderId).populate('products.product');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ order });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

Oderrouter.put('/update/:orderId', Authentication, async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        if (!['pending', 'shipped', 'delivered', 'canceled'].includes(status)) {
            return res.status(400).json({ message: 'Invalid order status' });
        }

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = status;
        await order.save();

        res.status(200).json({ message: 'Order status updated successfully', order });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

Oderrouter.delete('/delete/:orderId', Authentication, async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findByIdAndDelete(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

export default Oderrouter;
