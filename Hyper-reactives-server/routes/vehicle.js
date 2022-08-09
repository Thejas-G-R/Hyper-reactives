const express = require("express")
const { add, changeStatus, getAllVehicles, getAllVehiclesAdmin, getServiceHistory } = require("../controllers/vehicle")
const { authenticate } = require('../middleware/authenticator')
const { adminAuthenticate } = require('../middleware/adminAuthenticator')
const router = express.Router()

router.post('/add', authenticate, add);

router.post('/changeStatus', adminAuthenticate, changeStatus)

router.get('/getAll', authenticate, getAllVehicles)

router.get('/getAdminAll', adminAuthenticate, getAllVehiclesAdmin)

router.get('/getServiceHistory', authenticate, getServiceHistory)

module.exports = router 