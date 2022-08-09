const Vehicle = require("../models/vehicle")
const ServiceProvider = require("../models/serviceProvider")
const { receiptGenerator } = require("../services/receiptGenerator")
const Service = require("../models/service")

exports.approveReceipt = (req, res) => {

    const service = new Service({
        vehicle: req.body.vehicleId,
        serviceProvider: req.body.serviceProviderId,
        date: req.body.date,
        mileage: req.body.mileage,
        description: req.body.description,
        price: req.body.price,
    })

    service.save((err, service) => {
        if (err) {
            return res.status(200).json({
                code: 1, 
                message: "Unable to add service",
                err: err
            })
        }


        Vehicle.findOneAndUpdate({ _id: req.body.vehicleId }, { $push: { serviceHistory: service._id } }, { new: true }, (err, vehicle) => {
            if (err) {
                return res.status(200).json({
                    code: 1, 
                    message: "Unable to add service to vehicle",
                    err: err
                })
            }
    
            return res.json({
                code: 0,
                message: "Success",
                service
            })
        })
    })

}

exports.getReceipt = (req, res) => {

    return getReceipt(req.body, res)

}

function getReceipt(body, res) {

    Vehicle.findOne({ _id: body.vehicleId }, (err, vehicle) => {
        if (err) {
            return res.status(200).json({
                code: 1,
                message: "Unable to get vehicle",
                err: err
            })
        }

        ServiceProvider.findOne({ _id: body.serviceProviderId }, (err, serviceProvider) => {
            if (err) {
                return res.status(200).json({
                    code: 1,
                    message: "Unable to get serviceProvider",
                    err: err
                })
            }

            var result = receiptGenerator(vehicle, serviceProvider)

            return res.status(200).send(result)
        })

    })

}
