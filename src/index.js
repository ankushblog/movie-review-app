const express = require('express')
const user = require('./models/user')
require('./db/mongoose')                //make sure that this file run and connect to database

//const User = require('./models/user')     //after restructuring this two lines are not required here
//const Movie = require('./models/movie')

const userRouter = require('./routers/user')
const movieRouter = require('./routers/movie')

const app = express()

const port = process.env.PORT || 3000


// to restrict all get request
// app.use((req, res, next) => {

//     if (req.method === "GET") {
//         res.send('GET requests are not allowed')
//     }
//     else {
//         next()
//     }
// })

app.use(express.json())
app.use(userRouter)
app.use(movieRouter)


app.listen(port, () => {
    console.log('server is up on port' + port)
})


//demo examples
// const bcrypt = require('bcrypt')

// const myFunction = async () => {
//     const pass = 'ankush1'
//     // const pass1 = 'ankush11'
//     const hashedpass = await bcrypt.hash(pass, 8)

//     console.log(pass)
//     console.log(hashedpass)

//     const isMatch = await bcrypt.compare(pass, hashedpass)
//     console.log(isMatch)
// }
// myFunction()


//json web token example 

// const jwt = require('jsonwebtoken')
// const myFunction = async () => {

//     const token = await jwt.sign('_id:ankush123', 'thisiskey')

//     console.log(token)

//     const verify = jwt.verify(token, 'thisiskey')
//     console.log(verify)
// }
// myFunction()