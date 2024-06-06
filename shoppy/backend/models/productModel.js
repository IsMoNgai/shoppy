import mongoose from "mongoose";
const {ObjectId} = mongoose.Schema

const reviewSchema = mongoose.Schema({
    name: {type: String, required: true},
    rating: {type: Number, required: true},
    review: {type: String, required: true},
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: "User"
    }
}, {timestamp : true});

const productSchema = mongoose.Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    brand: {type: String, required: true},
    quantity: {type: Number, required: true},
    category: {type: ObjectId, ref: "Category", required: true},
    description: {type: String, required: true},
    review: [reviewSchema],
    rating: {type: Number, required: true, default: 0},
    numReviews: {type: Number,  required: true, default: 0},
    price: {type: Number, required: true, default: 0},
    countInStock: {type: Number, required: true, default: 0},
}, {timestamp:true});

const Product = mongoose.model('Product', productSchema)
export default Product;