const mongoose = require('mongoose');
var validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/movie-review-app-api', {

    useNewURLParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})

// const user = mongoose.model('User', {

//     usertype: {
//         type: String,
//         trim: true,
//         required: true

//     },
//     name: {
//         type: String,
//         trim: true

//     },
//     email: {
//         type: String,
//         trim: true,
//         required: true

//     },
//     password: {
//         type: String,
//         minLength: 8,
//         required: true,

//         validate(value) {
//             if (value.includes('password')) {
//                 throw new Error('password contains "password"')
//             }
//         }
//     },
//     age: {
//         type: Number,
//         validate(value) {
//             if (value < 18) {
//                 throw new Error('You should be atleast 18+ to login')
//             }
//         }
//     }
// })

// const me = new user({
//     usertype: 'admin',
//     email: 'ankush@gmail.com',
//     password: 'ankus566h3',
//     name: 'ankush',
//     age: 28
// })

// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log(error)
// })


// const movie = mongoose.model('Movie', {

//     name: {
//         type: String
//     },
//     releasedate: {
//         type: Number
//     },
//     image: {
//         type: String
//     },
//     description: {
//         type: String
//     }

// })

// const mo = new movie({

//     name: 'thor',
//     releasedate: 2020,
//     image: '.jpeg',
//     description: 'marval universe'
// })

// mo.save().then(() => {
//     console.log(mo)
// }).catch((error) => {
//     console.log(error)
// })