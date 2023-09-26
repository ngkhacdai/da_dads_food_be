const mongoose = require('mongoose');

var categorySchema = mongoose.Schema(
    {
        name : {
            type: String,
            require: true,
            unique: true,
        }
    }
)
module.exports = mongoose.model('category',categorySchema)