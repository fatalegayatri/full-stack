import mongoose from "mongoose";

const Product = mongoose.Schema({
    name: {
        type: string,
        required: true
    },
    desc: {
        type: string,
        required: false
    },
    price: {
        type: string,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})
export default mongoose.model('Product', Product)