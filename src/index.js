const express = require('express')
const user = require('./models/user')
require('./db/mongoose')                //make sure that this file run and connect to database
const User = require('./models/user')
const Movie = require('./models/movie')

const app = express()

const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', async (req, res) => {

    const user = new User(req.body);

    try {
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
    // res.send(req.body)
    // console.log(req.body)

})

app.get("/users", async (req, res) => {

    try {
        const users = await User.find({});
        res.send(users);
    }
    catch (e) {
        res.send(e);
    }

})

app.get("/users/:id", async (req, res) => {

    const _id = req.params.id;

    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user)

    } catch (e) {
        res.status(500).send();
    }

})



app.post('/movies', async (req, res) => {

    const movie = new Movie(req.body);

    try {
        await movie.save();
        res.status(201).send(movie);
    } catch (e) {
        res.status(400).send(e);
    }
    // res.send(req.body)
    // console.log(req.body)

})

app.get("/movies", async (req, res) => {

    try {
        const movies = await Movie.find({});
        res.send(movies);
    }
    catch (e) {
        res.send(e);
    }

})

app.get("/movies/:id", async (req, res) => {

    const _id = req.params.id;

    try {
        const movie = await Movie.findById(_id);
        if (!movie) {
            return res.status(404).send();
        }
        res.send(movie)

    } catch (e) {
        res.status(500).send();
    }

})


app.listen(port, () => {
    console.log('server is up on port' + port)
})