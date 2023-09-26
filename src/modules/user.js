const mongoose = require('mongoose');

var userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            require: true,
            unique: true,
        },
        email: {
            type: String,
            require: true,
            unique: true,
            index: true
        },
        password: {
        type: String,
        required: true,
        unique: true,
        },
        address: {
            type: String,
            require: true,
            unique: true
        },
        phone: {
            type: Number,
            unique: true,
            require: true
        }
    })

module.exports = mongoose.model('user',userSchema)