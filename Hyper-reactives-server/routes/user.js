const express = require("express")
const { signup, signin, signout } = require("../controllers/user")
const { check } = require('express-validator')
const { ping } = require("../controllers/ping")
const router = express.Router()

router.post('/ping', ping)

router.post('/signup', [
    check("name", "Name must contain a minimum of 3 characters").isLength({ min: 3 }),
    check("email", "Invalid Email format").isEmail(),
    check("password", "Password must contain a minimum of 6 characters").isLength({ min: 6 }),
], signup)

router.post('/signin', signin)

router.get("/signout", signout)

module.exports = router