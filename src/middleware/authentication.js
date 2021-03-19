const jwt = require('jsonwebtoken')
const User = require('../models/user')


//this function will authenticate user based on tokens 
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')

        const decoded = jwt.verify(token, 'thisiskey')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        if (!user) {
            throw new Error()
        }
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'please authenticate' })
    }
}

module.exports = auth

