const express = require('express')
const router = new express.Router()
const Movie = require('../models/movie')
const multer = require('multer')
const auth = require('../middleware/authentication')


router.get('/test1', (req, res) => {
    res.send('this is another test end point ')
})


//add movie
router.post('/movies', auth, async (req, res) => {

    const movie = new Movie(req.body);

    try {
        await movie.save();
        res.status(201).send(movie);
    } catch (e) {
        res.status(400).send(e);
    }


})

//get all movies
router.get("/movies", auth, async (req, res) => {

    try {
        const movies = await Movie.find({});
        res.send(movies);
    }
    catch (e) {
        res.send(e);
    }

})

// get the movie by unique id
router.get("/movies/:id", auth, async (req, res) => {

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

//update movie details
router.patch("/movies/:id", auth, async (req, res) => {

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

//delete movie 
router.delete('/movies/:id', auth, async (req, res) => {
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

//for file upload 
const upload = multer({
    //dest: 'avatars',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg)$/)) {
            return cb(new Error('please upload jpg or jpeg'))
        }
        cb(undefined, true)
    }
})


//basic uploading 
// router.post('/movies/upload', upload.single('avatar'), async (req, res) => {
//     res.send()

// }, (error, req, res, next) => {
//     res.status(400).send({ error: error.message })
// })




//adding poster to movie
router.post('/movies/:id', upload.single('avatar'), async (req, res) => {

    const movie = await Movie.findById(req.params.id)
    movie.avatar = req.file.buffer
    await movie.save()
    res.status(200).send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})



//display the poster of movie
router.get('/movies/:id/avatar', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id)

        if (!movie || !movie.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/jpg')
        res.send(movie.avatar)
    } catch (e) {
        res.status(404).send()
    }
})

//deleting the poster from perticular movie
router.delete('/movies/:id', auth, async (req, res) => {
    const movie = await Movie.findById(req.params.id)
    movie.avatar = undefined
    await movie.save()
    res.status(200).send()
})

module.exports = router