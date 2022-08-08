const mongoose = require("mongoose")
const User = require('./user')
const Service = require('./service')

const vehicleSchema = new mongoose.Schema({
    make: {
        type: String,
        required: true,
        trim: true
    },
    model: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    year: {
        type: String,
        required: true,
        trim: true,
        maxlength: 4,
    },
    color: {
        type: String,
        required: true,
        trim: true
    },
    registrationNumber: {
        type: String,
        required: true,
        trim: true
    },
    registrationState: {
        type: String,
        required: true,
        trim: true
    },
    VIN: {
        type: String,
        required: true,
        trim: true
    },
    insuranceNumber: {
        type: String,
        required: true,
        trim: true
    },
    serviceHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
    }],
    status: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Vehicle", vehicleSchema)