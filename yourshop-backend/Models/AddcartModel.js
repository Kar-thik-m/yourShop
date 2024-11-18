import mongoose from "mongoose";
import { ItemsModel } from "./ItemModel.js";

const addCartSchema = new mongoose.Schema(
    {

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },


        products: [
            {

                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Items",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    default: 1,
                    min: 1,
                },
            },
        ],


        totalPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
    },
    { timestamps: true }
);


addCartSchema.methods.calculateTotalPrice = async function () {
    let total = 0;


    for (const item of this.products) {
        const product = await ItemsModel.findById(item.product);
        if (product) {
            total += product.price * item.quantity;
        }
    }


    this.totalPrice = total;

    await this.save();
};


export const AddCartModel = mongoose.model("AddCart", addCartSchema);
