const mongoose = require('mongoose');

var productSchema = mongoose.Schema(
    {
        name : {
            type: String,
            require: true,
        },
        description : {
            type: String,
            require: true,
        },
        price: {
            type: Number,
            require: true,
        },
        category  : {
        type: String,
        required: true,
        },
        image : {
            data: String,
            contentType: String,
        },
        stockQuantity : {
            type: Number,
            require: true
        },
        soldQuantity: {
            type: Number,
            default: 0,
            require: true
        }
    }
)
module.exports = mongoose.model('product',productSchema)