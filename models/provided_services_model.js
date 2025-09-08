const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *   schemas:
 *     ProvidedService:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated ID
 *           example: "64f1a2b3c4d5e6f7890a5555"
 *         serviceName:
 *           type: string
 *           example: "Консультація лікаря Спеціаліст"
 *         serviceCategory:
 *           type: string
 *           example: "Консультація"
 *         date:
 *           type: string
 *           format: date-time
 *           example: "2025-09-08T12:00:00.000Z"
 *         price:
 *           type: number
 *           example: 500
 *         discountedPrice:
 *           type: number
 *           example: 450
 *       required:
 *         - serviceName
 *         - serviceCategory
 *         - date
 *         - price
 *         - discountedPrice
 */

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