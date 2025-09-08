const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *   schemas:
 *     Service:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated ID
 *           example: "64f1a2b3c4d5e6f7890a6666"
 *         name:
 *           type: string
 *           example: "Консультація терапевта"
 *         category:
 *           type: string
 *           enum: ['Консультація', 'Процедура']
 *           example: "Консультація"
 *         price:
 *           type: number
 *           example: 500
 *       required:
 *         - name
 *         - category
 *         - price
 */

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