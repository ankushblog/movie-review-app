const mongoose = require('mongoose');
var validator = require('validator');

const Movie = mongoose.model('Movie', {

    name: {
        type: String,
        trim: true,
        required: true
    },
    releasedate: {
        type: Number
    },
    image: {
        type: String
    },
    description: {
        type: String
    }

})

module.exports = Movie