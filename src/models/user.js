const mongoose = require('mongoose');
var validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


//fields of user model 
const userSchema = new mongoose.Schema({

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
        unique: true,
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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})


//method for generating token 
userSchema.methods.generateAuthenticationToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)


    user.tokens = user.tokens.concat({ token: token })
    await user.save()

    return token
}


// checking the username and password before login 
userSchema.statics.findByIdPassword = ((email, password) => {
    const user = User.findOne({ email });
    if (!user) {
        throw new Error('unable to login')
    }

    const isMatch = bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('unable to login')
    }

    return user
})


//user schema for encrypting password before saving (pre)
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User