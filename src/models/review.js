const mongoose = require('mongoose')

//create schema
const commentSchema = new mongoose.Schema({
    review: {
        type: String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    movie_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Story'
    },
}, {
    timestamps: true
})

const Review = new mongoose.model('Review', commentSchema)
module.exports = Review