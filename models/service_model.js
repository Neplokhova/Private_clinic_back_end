const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
    },
    category: {
        type: String,
        required: true,
        enum: ['Консультація', 'Процедура'],
    },
    price: {
        type: Number,
        required: true,
    },

}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

serviceSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

module.exports = mongoose.model("Service", serviceSchema);