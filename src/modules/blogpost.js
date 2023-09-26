const mongoose = require('mongoose');

var blogpostSchema = mongoose.Schema(
    {
        title  : {
            type: String,
            require: true,
            unique: true,
        },
        content  : {
            type: String,
            require: true,
            unique: true
        },
        author    : {
        type: String,
        required: true,
        unique: true,
        },
        createdAt   : {
            type: Date,
            require: true,
            unique: true
        },
        tags   : {
            type: Array,
            unique: true,
            require: true
        }
    }
)
module.exports = mongoose.model('blogpost',blogpostSchema)