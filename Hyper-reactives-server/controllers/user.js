const User = require("../models/user")
const { validationResult } = require('express-validator')
var jwt = require('jsonwebtoken')

exports.signup = (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(200).json({
            code: 1,
            message: 'Validation error',
            error: errors.array()[0].msg
        })
    }

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    console.log("calling save")

    user.save((err, user) => {
        if (err) {
            return res.status(200).json({
                code: 1,
                message: "Unable to add user",
                err: err
            })
        }

        return res.status(200).json({
            code: 0,
            message: 'Success',
            user
        })
    })
}


exports.signin = (req, res) => {
    const { email, password } = req.body

    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(200).json({
                code: 1,
                message: "Email was not found"
            })
        }

        // Authenticate user
        if (!user.authenticate(password)) {
            return res.status(200).json({
                code: 1,
                message: "Email and password do not match"
            })
        }

        // Create token
        const token = jwt.sign({ _id: user._id }, process.env.SECRET)

        // Put token in cookie
        res.cookie('token', token, { expire: new Date() + 1 })

        // Send response
        const { _id, name, email } = user
        return res.status(200).json({
            code: 0,
            message: 'Success',
            token,
            user: {
                _id,
                name,
                email
            }
        })

    })
}

exports.signout = (req, res) => {
    res.clearCookie("token")
    return res.status(200).json({
        code: 0,
        message: 'Success'
    })
}