const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated ID
 *           example: "64f1a2b3c4d5e6f7890a7777"
 *         username:
 *           type: string
 *           example: "john_doe"
 *         password:
 *           type: string
 *           example: "strongPassword123"
 *       required:
 *         - username
 *         - password
 */

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3 },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);