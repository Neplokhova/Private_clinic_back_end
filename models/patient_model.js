const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *   schemas:
 *     Patient:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           example: "Іван"
 *         lastName:
 *           type: string
 *           example: "Петренко"
 *         middleName:
 *           type: string
 *           example: "Васьльович"
 *         birthYear:
 *           type: number
 *           example: 1990
 *       required:
 *         - firstName
 *         - lastName
 *         - middleName
 *         - birthYear
 */

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
        required: true,
        minlength: 2,
    },
    birthYear: {
        type: Number,
        required: true,
        min: 1900,
        max: new Date().getFullYear(),

    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

patientSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

module.exports = mongoose.model("Patient", patientSchema);