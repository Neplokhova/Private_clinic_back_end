const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctor_model');


router.get('/', async (req, res) => {
    const doctors = await Doctor.find();
    res.json(doctors);
});

router.get('/:id', async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) return res.status(404).json({ error: 'Not found' });
        res.json(doctor);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const doctor = new Doctor(req.body);
        await doctor.save();
        res.status(201).json({message: 'New doctor created'});
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
})

router.put('/:id', async (req, res) => {
    try {
        const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(doctor);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Doctor.findByIdAndDelete(req.params.id);
        res.json({message: 'Deleted successfully'});
    } catch (err) {
        res.status(400).json({error: err.message});
    }
});

module.exports = router;