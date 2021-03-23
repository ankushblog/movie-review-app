const mongoose = require('mongoose');
var validator = require('validator');

mongoose.connect(process.env.MONGODB_URL, {

    useNewURLParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})

