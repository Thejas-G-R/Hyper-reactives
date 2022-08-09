const Vehicle = require("../models/vehicle")
const ServiceProvider = require("../models/serviceProvider")
const { receiptGenerator } = require("../services/receiptGenerator")

exports.approveReceipt = (req, res) => {
    
}

exports.getReceipt = (req, res) => {

    return getReceipt(req.body, res)

}

function getReceipt(body, res) {

    Vehicle.findOne({ _id: body.vehicleId }, (err, vehicle) => {
        if (err) {
            return res.status(400).json({
                error: "Unable to get vehicle",
                err: err
            })
        }

        ServiceProvider.findOne({ _id: body.serviceProviderId }, (err, serviceProvider) => {
            if (err) {
                return res.status(400).json({
                    error: "Unable to get serviceProvider",
                    err: err
                })
            }

            var result = receiptGenerator(vehicle, serviceProvider)

            return res.status(200).send(result)
        })

    })

}
