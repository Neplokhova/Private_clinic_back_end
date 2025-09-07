const express = require('express');
const router = express.Router();
const Service = require('../models/service_model');


router.get('/', async (req, res) => {
    const services = await Service.find();
    res.json(services);
});

router.get('/:id', async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) return res.status(404).json({ error: 'Not found' });
        res.json(service);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const service = new Service(req.body);
        await service.save();
        res.status(201).json({message: 'New service created'});
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
})

router.put('/:id', async (req, res) => {
    try {
        const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(service);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Service.findByIdAndDelete(req.params.id);
        res.json({message: 'Deleted successfully'});
    } catch (err) {
        res.status(400).json({error: err.message});
    }
});

module.exports = router;