const mongoose = require("mongoose")

const serviceProviderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    phone: {
        type: String,
        trim: true,
        maxlength: 10,
        required: true,
        unique: true
    },
    address: {
        street: {
            type: String,
            trim: true,
            required: true,
        },
        city: {
            type: String,
            trim: true,
            required: true,
        },
        state: {
            type: String,
            trim: true,
            required: true,
        },
        zipcode: {
            type: String,
            maxlength: 5,
            trim: true,
            required: true,
        }
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
    },
    description: {
        type: String,
        maxlength: 150,
        required: true,
        trim: true,
    }
}, { timestamps: true })

module.exports = mongoose.model("ServiceProvider", serviceProviderSchema)