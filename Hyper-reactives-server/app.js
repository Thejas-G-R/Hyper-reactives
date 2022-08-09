const mongoose = require("mongoose")
const express = require("express")
const app = express()

const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")
require("dotenv").config();

// DB Connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("DB CONNECTED")
}).catch(() => {
    console.log("UNABLE to connect to DB")
})

mongoose.set('useFindAndModify', false);

// Use parsing middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser())
app.use(cors())

// Import the routes
const userRoutes = require("./routes/user")
const serviceProviderRoutes = require("./routes/serviceProvider")
const vehicleRoutes = require("./routes/vehicle")
const serviceRoutes = require("./routes/service")

// Using routes
app.use('/user', userRoutes)
app.use('/serviceProvider', serviceProviderRoutes)
app.use('/user/vehicle', vehicleRoutes)
app.use('/user/vehicle/service', serviceRoutes)


const port = process.env.PORT || 8000

// Starting a server
app.listen(port, () => {
    console.log(`App is running at ${port}`)
})