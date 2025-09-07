const mongoose = require("mongoose");

const providedServiceSchema = new mongoose.Schema({
    serviceName: {
        type: String,
        required: true
    },
    serviceCategory: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    price: {
        type: Number,
        required: true
    },
    discountedPrice: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("ProvidedService", providedServiceSchema);