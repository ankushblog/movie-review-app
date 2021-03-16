const mongoose = require('mongoose');
var validator = require('validator');

const User = mongoose.model('User', {

    usertype: {
        type: String,
        trim: true,
        required: true

    },
    name: {
        type: String,
        trim: true

    },
    email: {
        type: String,
        trim: true,
        required: true

    },
    password: {
        type: String,
        minLength: 8,
        required: true,

        validate(value) {
            if (value.includes('password')) {
                throw new Error('password contains "password"')
            }
        }
    },
    age: {
        type: Number,
        validate(value) {
            if (value < 18) {
                throw new Error('You should be atleast 18+ to login')
            }
        }
    }
})

module.exports = User