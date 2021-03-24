const mongoose = require('mongoose');
var validator = require('validator');


//fields of movie model
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
    },
    avatar: {
        type: Buffer
    }

})

module.exports = Movie