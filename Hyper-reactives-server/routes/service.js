const express = require("express")
const { getReceipt, approveReceipt } = require('../controllers/service')
const router = express.Router()
const { authenticate } = require('../middleware/authenticator')

router.get("/getReceipt", authenticate, getReceipt)

router.get("/approveReceipt", authenticate, approveReceipt)

module.exports = router