const mongoose = require('mongoose');

var orderSchema = mongoose.Schema(
    {
        user  : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            require: true,
        },
        products  : {
            type: Array,
            require: true,
        },
        totalPrice   : {
        type: Number,
        required: true,
        },
        status  : {
            type: String,
            require: true,
            default: 'Chờ xác nhận'
        },
        orderDate  : {
            type: String,
            require: true,
            default: new Date().toISOString().split('T')[0],
        }
    }
)
module.exports = mongoose.model('order',orderSchema)