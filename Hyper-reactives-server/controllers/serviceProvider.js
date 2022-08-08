const ServiceProvider = require("../models/serviceProvider")
const { validationResult } = require('express-validator')

exports.add = (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.array()[0].msg
        })
    }

    const serviceProvider = new ServiceProvider({
        name: req.body.name,
        phone: req.body.phone,
        address: {
            street: req.body.street,
            city: req.body.city,
            state: req.body.state,
            zipcode: req.body.zipcode,
            rating: req.body.rating,
            description: req.body.description,
        },
        rating: req.body.rating,
        description: req.body.description,
    })

    serviceProvider.save((err, user) => {
        if (err) {
            return res.status(400).json({
                error: "Unable to add service provider",
                err: err
            })
        }

        return res.json({
            message: "Success",
            serviceProvider
        })
    })
}

exports.getAll = (req, res) => {
    ServiceProvider.find({}, function (err, providers) {
        if (err) {
            return res.status(400).json({
                error: "Unable to get service providers",
                err: err
            })
        }

        var serviceProvidersMap = {};

        providers.forEach(function (provider) {
            serviceProvidersMap[provider._id] = provider;
        });

        res.send(serviceProvidersMap);
    });
}

exports.edit = (req, res) => {

    const NewServiceProvider = {
        name: req.body.name,
        phone: req.body.phone,
        address: {
            street: req.body.street,
            city: req.body.city,
            state: req.body.state,
            zipcode: req.body.zipcode,
            rating: req.body.rating,
            description: req.body.description,
        },
        rating: req.body.rating,
        description: req.body.description,
    }

    ServiceProvider.findOneAndUpdate({ _id: req.body.id }, NewServiceProvider, { new: true }, (err, provider) => {
        if (err) {
            return res.status(400).json({
                error: "Unable to update service providers",
                err: err
            })
        }

        return res.send(provider);
    })

}