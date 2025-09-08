const mongoose = require("mongoose");
const { Schema } = mongoose;

/**
 * @swagger
 * components:
 *   schemas:
 *     Appointment:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated ID
 *           example: "64f1a2b3c4d5e6f7890a1234"
 *         doctor:
 *           type: string
 *           description: Doctor ID (ObjectId)
 *           example: "64f1a2b3c4d5e6f7890a1111"
 *         patient:
 *           type: string
 *           description: Patient ID (ObjectId)
 *           example: "64f1a2b3c4d5e6f7890a2222"
 *         date:
 *           type: string
 *           format: date-time
 *           description: Appointment date
 *           example: "2025-09-08T12:00:00.000Z"
 *         diagnosis:
 *           type: string
 *           description: Short diagnosis name
 *           example: "Грип"
 *         diagnosisDescription:
 *           type: string
 *           description: Detailed diagnosis description
 *           example: "Гостра респіраторна вірусна інфекція з температурою"
 *         treatmentDescription:
 *           type: string
 *           description: Description of treatment
 *           example: "Постільний режим, рясне пиття, жарознижувальні препарати"
 *         services:
 *           type: array
 *           description: Related services (ObjectIds)
 *           items:
 *             type: string
 *           example:
 *             - "64f1a2b3c4d5e6f7890a3333"
 *             - "64f1a2b3c4d5e6f7890a4444"
 *         basicPrice:
 *           type: number
 *           description: Base price before calculation
 *           example: 500
 *         price:
 *           type: number
 *           description: Final calculated price
 *           example: 750
 *       required:
 *         - doctor
 *         - patient
 *         - date
 *         - diagnosis
 *         - basicPrice
 *         - price
 */

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