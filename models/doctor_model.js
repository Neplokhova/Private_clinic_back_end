const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *   schemas:
 *     Doctor:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated ID
 *           example: "64f1a2b3c4d5e6f7890a1111"
 *         lastName:
 *           type: string
 *           example: "Петренко"
 *         firstName:
 *           type: string
 *           example: "Іван"
 *         middleName:
 *           type: string
 *           example: "Васильович"
 *         speciality:
 *           type: string
 *           example: "Терапевт"
 *         category:
 *           type: string
 *           enum: ['Молодший спеціаліст', 'Спеціаліст', 'Лікар вищої категорії', 'Доктор медчних наук']
 *           example: "Спеціаліст"
 *       required:
 *         - lastName
 *         - firstName
 *         - middleName
 *         - speciality
 *         - category
 */

const doctorSchema = new mongoose.Schema({
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
    speciality: {
        type: String,
        required: true,
        minlength: 2,
    },
    category: {
        type: String,
        required: true,
        enum: ['Молодший спеціаліст', 'Спеціаліст', 'Лікар вищої категорії', 'Доктор медчних наук'],

    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

doctorSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

module.exports = mongoose.model("Doctor", doctorSchema);