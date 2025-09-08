const express = require("express");
const router = express.Router();
const { createAppointment } = require("../controllers/appointmentController");
const Appointment = require('../models/appointment_model');

/**
 * @swagger
 * /appointments:
 *   post:
 *     summary: Create a new appointment
 *     tags: [Appointments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               doctorId:
 *                 type: string
 *                 description: ID лікаря (MongoDB ObjectId)
 *                 example: "68baef830ac8492e5b742c44"
 *               patientId:
 *                 type: string
 *                 description: ID пацієнта (MongoDB ObjectId)
 *                 example: "68bd6d5183d0b905ecfbf7fb"
 *               diagnosis:
 *                 type: string
 *                 example: "Грип"
 *               diagnosisDescription:
 *                 type: string
 *                 example: "Гостра респіраторна інфекція"
 *               treatmentDescription:
 *                 type: string
 *                 example: "Призначено ліки та постільний режим"
 *               services:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Масив ID послуг (Service ObjectId)
 *                 example: ["68bd6e8c9d1eba1d215195a5"]
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-09-08T10:30:00Z"
 *             required:
 *               - doctorId
 *               - patientId
 *               - diagnosis
 *               - services
 *               - date
 *     responses:
 *       201:
 *         description: Appointment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 appointment:
 *                   $ref: '#/components/schemas/Appointment'
 *                 providedServices:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ProvidedService'
 *       400:
 *         description: Doctor or patient not found / Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Лікар або пацієнт не знайдені"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Помилка сервера"
 */

router.post("/", createAppointment);


/**
 * @swagger
 * /appointments/patient/{id}:
 *   get:
 *     summary: Get all appointments for a specific patient
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Patient ID (MongoDB ObjectId)
 *     responses:
 *       200:
 *         description: List of appointments for the patient
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Appointment'
 *       400:
 *         description: Invalid patient ID
 *       500:
 *         description: Server error
 */

router.get('/patient/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const appointments = await Appointment.find({ patient: id })
            .populate('doctor')
            .populate('patient')
            .populate('services');

        res.json(appointments);
    } catch (err) {
        console.error('Помилка при отриманні звернень:', err);
        res.status(500).json({ error: 'Помилка сервера' });
    }
});

module.exports = router;