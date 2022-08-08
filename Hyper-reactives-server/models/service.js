const mongoose = require("mongoose")
const Vehicle = require('./vehicle')
const ServiceProvider = require('./serviceProvider')

const serviceSchema = new mongoose.Schema({
    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: true
    },
    serviceProvider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ServiceProvider',
        required: true
    },
    date: {
        type: String,
        required: true,
        trim: true
    },
    mileage: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    }

}, { timestamps: true })

module.exports = mongoose.model("Service", serviceSchema)