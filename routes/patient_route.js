const express = require('express');
const router = express.Router();
const Patient = require('../models/patient_model');

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve a list of patients
 *     responses:
 *       200:
 *         description: A list of patients
 */

router.get('/', async (req, res) => {
    const patients = await Patient.find();
    res.json(patients);
});

router.get('/:id', async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) return res.status(404).json({ error: 'Not found' });
        res.json(patient);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
        try {
            const patient = new Patient(req.body);
            await patient.save();
            res.status(201).json({message: 'New patient created'});
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    })

router.put('/:id', async (req, res) => {
    try {
        const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(patient);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Patient.findByIdAndDelete(req.params.id);
        res.json({message: 'Deleted successfully'});
    } catch (err) {
        res.status(400).json({error: err.message});
    }
});

module.exports = router;
