const express = require("express")
const { add, changeStatus, getAllVehicles, getAllVehiclesAdmin } = require("../controllers/vehicle")
const { authenticate } = require('../middleware/authenticator')
const { adminAuthenticate } = require('../middleware/adminAuthenticator')
const router = express.Router()

router.post('/add', authenticate, add);

router.post('/changeStatus', adminAuthenticate, changeStatus)

router.get('/getAll', authenticate, getAllVehicles)

router.get('/getAdminAll', adminAuthenticate, getAllVehiclesAdmin)

module.exports = router 