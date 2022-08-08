const express = require("express")
const { check } = require('express-validator')
const { add, getAll, edit } = require('../controllers/serviceProvider')
const router = express.Router()
const { authenticate } = require('../middleware/adminAuthenticator')

router.post('/add', authenticate, add)

router.post('/edit', authenticate, edit)

router.get("/getAll", authenticate, getAll)

//router.post("/deactivate", deactivate)
//not needed for now

module.exports = router