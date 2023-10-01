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
            type: String,
            require: true,
        },
        category  : {
        type: String,
        required: true,
        },
        image : {
            type: String,
            require: true,
        },
        stockQuantity : {
            type: Number,
            require: true
        }
    }
)
module.exports = mongoose.model('product',productSchema)