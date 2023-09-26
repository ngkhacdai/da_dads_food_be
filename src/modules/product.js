const mongoose = require('mongoose');

var productSchema = mongoose.Schema(
    {
        name : {
            type: String,
            require: true,
            unique: true,
        },
        description : {
            type: String,
            require: true,
            unique: true
        },
        category  : {
        type: Number,
        required: true,
        unique: true,
        },
        image : {
            type: String,
            require: true,
            unique: true
        },
        stockQuantity : {
            type: Number,
            unique: true,
            require: true
        }
    }
)
module.exports = mongoose.model('product',productSchema)