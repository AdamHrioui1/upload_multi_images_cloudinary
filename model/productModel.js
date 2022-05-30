const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    },
    images: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
})

const Product = mongoose.model('Product', ProductSchema)
module.exports = Product