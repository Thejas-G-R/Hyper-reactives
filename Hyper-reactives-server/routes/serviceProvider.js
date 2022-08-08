const express = require("express")
const { check } = require('express-validator')
const { add, getAll, edit } = require('../controllers/serviceProvider')
const router = express.Router()
const { adminAuthenticate } = require('../middleware/adminAuthenticator')

router.post('/add', adminAuthenticate, add)

router.post('/edit', adminAuthenticate, edit)

router.get("/getAll", adminAuthenticate, getAll)

//router.post("/deactivate", deactivate)
//not needed for now

module.exports = router