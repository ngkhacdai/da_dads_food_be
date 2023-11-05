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
        author : {
        type: String,
        required: true,
        },
        createdAt   : {
            type: String,
            require: true,
            default: new Date().toISOString().split('T')[0],
        },

    }
)
module.exports = mongoose.model('blogpost',blogpostSchema)