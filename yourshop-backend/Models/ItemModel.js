import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    Productname: {
        type: String,
        required: [true, "Please enter product name"],
        trim: true,

    },
    price: {
        type: Number,
        required: true,
        default: 0.0
    },
    description: {
        type: String,
        required: [true, "Please enter product description"]
    },
    ratings: {
        type: String,
        default: 0
    },
    itemimage:
    {
        id: String,
        url: String,

    },

    category: {
        type: String,
        required: [true, "Please enter product category"],
    },
    seller: {
        type: String,
        required: [true, "Please enter product seller"]
    },
    stock: {
        type: Number,
        required: [true, "Please enter product stock"],
        maxLength: [20, 'Product stock cannot exceed 20']
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            rating: {
                type: String,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

export const ItemsModel = mongoose.model('Items', productSchema)

