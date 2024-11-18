import express from 'express';
import { ItemsModel } from '../Models/ItemModel.js';
import cloudinary from "cloudinary";
import getUrl from '../Utils/GenerateUrl.js';
import uploadFile from '../Middleware/uploadFile.js';
import { Authentication } from '../Middleware/Authentication.js';

const Itemrouter = express.Router();


Itemrouter.post('/product', Authentication, uploadFile, async (req, res) => {
    try {
        const payload = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const fileurl = getUrl(file);
        const cloud = await cloudinary.v2.uploader.upload(fileurl.content);

        const newItem = new ItemsModel(
            {
                ...payload,
                itemimage: { id: cloud.public_id, url: cloud.secure_url },
            }
        );

        await newItem.save();

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            newItem,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

Itemrouter.get('/get-all-product', async (req, res) => {
    try {
        const products = await ItemsModel.find();
        res.status(200).json({
            success: true,
            message: "Products retrieved successfully",
            products,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});


Itemrouter.delete('/product/:id', async (req, res) => {
    try {
        const product = await ItemsModel.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});


Itemrouter.put('/product/:id', async (req, res) => {
    try {
        const updatedProduct = await ItemsModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});


Itemrouter.get('/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const ItemsById = await ItemsModel.findById(id);
        if (!ItemsById) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        res.status(200).json({
            success: true,
            ItemsById
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});


Itemrouter.get('/products/search', async (req, res) => {
    const { query } = req.query;
    if (!query) {
        return res.status(400).json({
            success: false,
            message: "Search query is required",
        });
    }

    try {
        const products = await ItemsModel.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ]
        });
        res.status(200).json({
            success: true,
            data: products,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});


Itemrouter.get('/products/category/:category', async (req, res) => {
    const { category } = req.params;

    try {
        const products = await ItemsModel.find({ category });
        if (products.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No products found in this category",
            });
        }
        res.status(200).json({
            success: true,
            data: products,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

export default Itemrouter;
