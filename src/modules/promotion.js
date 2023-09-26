const mongoose = require('mongoose');

var promotionSchema = mongoose.Schema(
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
        discountCode   : {
        type: String,
        required: true,
        unique: true,
        },
        validFrom  : {
            type: Date,
            require: true,
            unique: true
        },
        validTo  : {
            type: Date,
            unique: true,
            require: true
        }
    }
)
module.exports = mongoose.model('promotion',promotionSchema)