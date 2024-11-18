import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
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
          min: [1, "Quantity must be at least 1"],
        },

        price: {
          type: Number,
          required: true,
          min: [0, "Price cannot be less than 0"],
        },

        totalPrice: {
          type: Number,
          required: true,
          min: [0, "Total price cannot be less than 0"],
        },
      },
    ],
   
    shippingAddress: {
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      PinCode: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    status: {
      type: String,

      default: "pending",
    },
    paymentInfo: {
      paymentMethod: {
        type: String,
        required: true,
      },
      paymentStatus: {
        type: String,
        default: "pending",
      },
      transactionId: {
        type: String,
      },
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    deliveryDate: {
      type: Date,
    },
  },
  { timestamps: true } 
);

export const Order = mongoose.model("Order", orderSchema);
