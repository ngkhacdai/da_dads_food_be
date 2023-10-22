const mongoose = require('mongoose');

var cartSchema = mongoose.Schema(
    {
        user: { type: mongoose.Schema.ObjectId, ref: 'user', required: true }, 
        items: [
            {
                product: { type: mongoose.Schema.ObjectId, ref: 'Product', required: true },
                quantity: { type: Number, default: 1 }, 
            },
        ],
        total: { type: Number, required: true }, 
        createdAt: { type: Date, default: Date.now() }
    })

module.exports = mongoose.model('cart',cartSchema)