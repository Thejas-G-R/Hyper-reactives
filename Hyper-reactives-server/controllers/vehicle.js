const Vehicle = require("../models/vehicle")

exports.add = (req, res) => {

    const vehicle = new Vehicle({
        make: req.body.make,
        model: req.body.model,
        owner: req.user,
        year: req.body.year,
        color: req.body.color,
        registrationNumber: req.body.registrationNumber,
        registrationState: req.body.registrationState,
        VIN: req.body.VIN,
        insuranceNumber: req.body.insuranceNumber,
        status: 'Requested'
    })

    vehicle.save((err, user) => {
        if (err) {
            return res.status(400).json({
                error: "Unable to add vehicle",
                err: err
            })
        }

        return res.json({
            message: "Success",
            vehicle
        })
    })

}


exports.changeStatus = (req, res) => {

    Vehicle.findOneAndUpdate({ _id: req.body.vehicleId }, { status: req.body.updatedStatus }, { new: true }, (err, vehicle) => {
        if (err) {
            return res.status(400).json({
                error: "Unable to update status of vehicle",
                err: err
            })
        }

        return res.json({
            message: "Success",
            vehicle
        })
    })

}

exports.getAllVehicles = (req, res) => {

    Vehicle.find({}, function (err, vehicles) {
        if (err) {
            return res.status(400).json({
                error: "Unable to get vehicles",
                err: err
            })
        }

        var result = { vehicles: [] };

        vehicles.forEach(function (vehicle) {
            if (vehicle.owner == req.user._id)
                result.vehicles.push({
                    id: vehicle._id,
                    make: vehicle.make,
                    model: vehicle.model,
                    ownerId: vehicle.owner,
                    year: vehicle.year,
                    color: vehicle.color,
                    registrationNumber: vehicle.registrationNumber,
                    registrationState: vehicle.registrationState,
                    VIN: vehicle.VIN,
                    insuranceNumber: vehicle.insuranceNumber,
                    status: vehicle.status
                })
        });

        res.send(result);
    });

}


exports.getAllVehiclesAdmin = (req, res) => {

    Vehicle.find({}, function (err, vehicles) {
        if (err) {
            return res.status(400).json({
                error: "Unable to get vehicles",
                err: err
            })
        }

        var result = { vehicles: [] };

        vehicles.forEach(function (vehicle) {
            result.vehicles.push({
                id: vehicle._id,
                make: vehicle.make,
                model: vehicle.model,
                ownerId: vehicle.owner,
                year: vehicle.year,
                color: vehicle.color,
                registrationNumber: vehicle.registrationNumber,
                registrationState: vehicle.registrationState,
                VIN: vehicle.VIN,
                insuranceNumber: vehicle.insuranceNumber,
                status: vehicle.status
            })
        });

        res.send(result);
    });

}
