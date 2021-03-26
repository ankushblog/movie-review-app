const express = require('express')
const user = require('./models/user')
require('./db/mongoose')                //make sure that this file run and connect to database
const cors = require('cors')

//const User = require('./models/user')     //after restructuring this two lines are not required here
//const Movie = require('./models/movie')


var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const userRouter = require('./routers/user')
const movieRouter = require('./routers/movie')

const app = express() 

const port = process.env.PORT

app.use(express.json())
app.use(cors(corsOptions))
app.use(userRouter)
app.use(movieRouter)


app.listen(port, () => {
    console.log('server is up on port' + port)
})

