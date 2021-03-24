const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/authentication')



// router.get('/test', (req, res) => {
//     res.send('hello from ankush')
// })


//add new user
router.post('/users', async (req, res) => {

    const user = new User(req.body);

    try {
        await user.save();
        const token = await user.generateAuthenticationToken()
        res.status(201).send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
    // res.send(req.body)
    // console.log(req.body)

})


//user login 

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByIdPassword(req.body.email, req.body.password)
        const token = await user.generateAuthenticationToken()

        //res.send(user)
        // const pass = req.body.password;
        // const emailid = req.body.email;

        // res.send({ pass, emailid })
         res.send({ user, token })

    } catch (e) {
        res.send('user not found')
    }
})

//users own profile
router.get("/users/me", auth, async (req, res) => {

    res.send(req.user)

})

// logout from the current session
router.post("/users/logout", auth, async (req, res) => {

    try {
        req.user.tokens = req.user.tokens.filter((token) => {

            return token.token !== req.token

        })
        await req.user.save()

        res.send('successfully logout')
    } catch (e) {
        res.status(500).send()
    }

})

// logout from all the sessions currently user is login
router.post("/users/logoutall", auth, async (req, res) => {
    try {
        req.user.tokens = []

        await req.user.save()
        res.send('successfully logout from all accounts')
    } catch (e) {
        res.status(500).send()
    }

})



//this end point is not useful as one user cannot see all other users data
// router.get("/users", auth, async (req, res) => {

//     try {
//         //   const users = await User.find({});
//         res.send(req.user);
//     }
//     catch (e) {
//         res.send(e);
//     }

// })

//get user by unique id

router.get("/users/:id", async (req, res) => {

    const _id = req.params.id;

    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user)

    } catch (e) {
        res.status(500).send(e);
    }

})

//update user based on id
router.patch("/users/:id", async (req, res) => {

    const updates = Object.keys(req.body);
    const allowUpdates = ['usertype', 'name', 'email', 'password', 'age'];

    const isValidOperation = updates.every((update) => {
        return allowUpdates.includes(update);
    })

    if (!isValidOperation) {
        return res.status(404).send();
    }
    const _id = req.params.id;
    try {

        const user = await User.findById(_id);
        updates.forEach((update) => {
            user[update] = req.body[update]

        })

        //in the below line, mongoose function will bypass the middleware 
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).send();
        }
        await user.save()
        res.status(201).send(user);
    } catch (e) {
        return res.status(404).send(e);
    }
})

//delete user by id
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(404).send();
        }
        res.send(user);

    } catch (e) {
        res.status(500).send(e);
    }
})





module.exports = router