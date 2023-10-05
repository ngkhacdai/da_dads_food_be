const mongoose = require('mongoose');

var userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            require: true,
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
        },
        address: {
            type: String,
            require: true,
        },
        phone: {
            type: Number,
            unique: true,
            require: true
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        }
    })

module.exports = mongoose.model('user',userSchema)