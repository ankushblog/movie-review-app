const express = require('express')
const router = new express.Router()
const Movie = require('../models/movie')


router.get('/test1', (req, res) => {
    res.send('this is another test end point ')
})



router.post('/movies', async (req, res) => {

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

router.get("/movies", async (req, res) => {

    try {
        const movies = await Movie.find({});
        res.send(movies);
    }
    catch (e) {
        res.send(e);
    }

})

router.get("/movies/:id", async (req, res) => {

    const _id = req.params.id;

    try {
        const movie = await Movie.findById(_id);
        if (!movie) {
            return res.status(404).send();
        }
        res.send(movie)

    } catch (e) {
        res.status(500).send(e);
    }

})

router.patch("/movies/:id", async (req, res) => {

    const updates = Object.keys(req.body);
    const allowUpdates = ['name', 'releasedate', 'image', 'description'];

    const isValidOperation = updates.every((update) => {
        return allowUpdates.includes(update);
    })

    if (!isValidOperation) {
        return res.status(404).send();
    }

    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!movie) {
            return res.status(404).send();
        }
        res.status(201).send(movie);
    } catch (e) {
        return res.status(404).send(e);
    }
})

router.delete('/movies/:id', async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);
        if (!movie) {
            res.status(404).send();
        }
        res.send(movie);

    } catch (e) {
        res.status(500).send(e);
    }
})


module.exports = router
