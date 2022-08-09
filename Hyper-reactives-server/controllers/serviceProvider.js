const ServiceProvider = require("../models/serviceProvider")
const { validationResult } = require('express-validator')

exports.add = (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(200).json({
            code: 1,
            message: 'Validation error',
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
            return res.status(200).json({
                code: 1,
                message: "Unable to add service provider",
                err: err
            })
        }

        return res.status(200).json({
            code: 0,
            message: 'Success',
            serviceProvider
        })
    })
}

exports.getAll = (req, res) => {
    ServiceProvider.find({}, function (err, providers) {
        if (err) {
            return res.status(200).json({
                code: 1,
                message: "Unable to get service providers",
                err: err
            })
        }

        var serviceProviders = { ServiceProviders: [] };

        providers.forEach(function (provider) {
            serviceProviders.ServiceProviders.push({
                id: provider._id,
                name: provider.name,
                phone: provider.phone,
                street: provider.address.street,
                city: provider.address.city,
                state: provider.address.state,
                zipcode: provider.address.zipcode,
                rating: provider.rating,
                description: provider.description,
            })
        });

        res.status(200).json({
            code: 0,
            message: 'Success',
            serviceProviders
        })
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
            return res.status(200).json({
                code: 1,
                message: "Unable to update service providers",
                err: err
            })
        }

        res.status(200).json({
            code: 0,
            message: 'Success',
            provider
        })
    })

}