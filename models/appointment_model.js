const mongoose = require("mongoose");
const { Schema } = mongoose;

const appointmentSchema = new Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    diagnosis: {
        type: String,
        required: true
    },
    diagnosisDescription: {
        type: String
    },
    treatmentDescription: {
        type: String
    },
    services: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Service"
        }
    ],
    basicPrice: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

appointmentSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

module.exports = mongoose.model("Appointment", appointmentSchema);