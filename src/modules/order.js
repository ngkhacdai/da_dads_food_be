const mongoose = require('mongoose');

var orderSchema = mongoose.Schema(
    {
        user  : {
            type: mongoose.Schema.ObjectId,
            require: true,
            unique: true,
        },
        products  : {
            type: Array,
            require: true,
            unique: true
        },
        totalPrice   : {
        type: Number,
        required: true,
        unique: true,
        },
        status  : {
            type: String,
            require: true,
            unique: true
        },
        orderDate  : {
            type: Date,
            unique: true,
            require: true
        }
    }
)
module.exports = mongoose.model('order',orderSchema)