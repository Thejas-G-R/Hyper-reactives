const express = require("express")
const { getReceipt } = require('../controllers/service')
const router = express.Router()
const { authenticate } = require('../middleware/authenticator')

router.get("/getReceipt", authenticate, getReceipt)

module.exports = router