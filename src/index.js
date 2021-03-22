const express = require('express')
const user = require('./models/user')
require('./db/mongoose')                //make sure that this file run and connect to database

//const User = require('./models/user')     //after restructuring this two lines are not required here
//const Movie = require('./models/movie')

const userRouter = require('./routers/user')
const movieRouter = require('./routers/movie')

const app = express()

const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(movieRouter)


app.listen(port, () => {
    console.log('server is up on port' + port)
})

