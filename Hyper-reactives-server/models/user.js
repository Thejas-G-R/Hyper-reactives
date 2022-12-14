const mongoose = require("mongoose")
const bcrypt = require("bcrypt");
const Vehicle = require('./vehicle')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    vehicles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
    }],
    encry_password: {
        type: String,
        required: true
    }
}, { timestamps: true })

userSchema.virtual("password")
    .set(function (password) {
        this._password = password
        this.encry_password = this.securePassword(password)
    })
    .get(function () {
        return this._password
    })

userSchema.methods = {
    authenticate: function (plainpassword) {
        return bcrypt.compareSync(plainpassword, this.encry_password)
    },

    securePassword: function (plainpassword) {
        if (!plainpassword) return "";
        return bcrypt.hashSync(plainpassword, 8)
    }
}

module.exports = mongoose.model("User", userSchema)