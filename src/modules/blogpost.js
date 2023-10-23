const mongoose = require('mongoose');

var blogpostSchema = mongoose.Schema(
    {
        title  : {
            type: String,
            require: true,
        },
        content  : {
            type: String,
            require: true,
        },
        author    : {
        type: String,
        required: true,
        },
        createdAt   : {
            type: Date,
            require: true,
        },
        tags   : {
            type: Array,
            require: true
        }
    }
)
module.exports = mongoose.model('blogpost',blogpostSchema)