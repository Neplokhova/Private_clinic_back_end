const mongoose = require("mongoose");

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