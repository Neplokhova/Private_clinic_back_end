const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
    lastName: {
        type: String,
        required: true,
        minlength: 2,
    },
    firstName: {
        type: String,
        required: true,
        minlength: 2,
    },
    middleName: {
        type: String,
        minlength: 2,
    },
    birthYear: {
        type: Number,
        required: true,
        min: 1900,
        max: new Date().getFullYear(),

    }
});

module.exports = mongoose.model("Patient", patientSchema);