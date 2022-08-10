const jwt = require('jsonwebtoken');
const User = require("../models/user")

exports.adminAuthenticate = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.SECRET, (err, user) => {
        console.log(err)

        User.findById(user._id, (err, user) => {
            if (err || !user) {
                return res.status(200).json({
                    code: 1,
                    message: "User was not found"
                })
            }
            const { _id, name, email } = user

            if (err || email != 'admin@gmail.com') return res.sendStatus(401)
            req.user = user
            next()

        })
    })
}

