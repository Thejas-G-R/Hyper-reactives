const express = require("express")
const { getReceipt, approveReceipt } = require('../controllers/service')
const router = express.Router()
const { authenticate } = require('../middleware/authenticator')

router.post("/getReceipt", authenticate, getReceipt)

router.post("/approveReceipt", authenticate, approveReceipt)

module.exports = router