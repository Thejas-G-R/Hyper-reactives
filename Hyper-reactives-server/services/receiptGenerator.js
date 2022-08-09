exports.receiptGenerator = function generateReceipt(vehicle, serviceProvider) {

    var descriptionArray = [
        "Changing the oil and filter. Tire service: rotation, alignment, balancing, air pressure (including the spare).",
        "Full Maintenance with car wash and body polish.",
        "Inspecting and cleaning the battery.",
        "Inspection and replace of fluids, filters, belts, hoses, brakes, and emissions.",
        "Windshield wipers replaced.",
        "Replacing burned out lights.",
        "Servicing the air conditioner/heater.",
        "Tyre puncture repair and refill with Nitrogen.",
        "Engine oil change and/or filter replacement.",
        "Checking hydraulic fluid and coolant levels.",
        "Suspension check and adjustment.",
        "Testing the car battery condition and recharging."
    ]

    var items = Math.floor(Math.random() * 4);

    var description = ""

    for (let i = 0; i <= items; i++) {
        description += descriptionArray[Math.floor(Math.random() * 12)] + " ";
    }

    var today = new Date()

    var receipt = {
        serviceProvider: serviceProvider,
        vehicle: vehicle,
        price: 100 + Math.floor(Math.random() * 500),
        mileage: Math.floor(Math.random() * 20000),
        date: today.toLocaleDateString("en-US"),
        description: description
    }

    return receipt

};