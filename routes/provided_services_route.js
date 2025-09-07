const express = require("express");
const router = express.Router();
const ProvidedService = require("../models/provided_services_model");


router.get("/", async (req, res) => {
    try {
        const services = await ProvidedService.find().sort({ date: -1 });
        res.json(services);
    } catch (err) {
        console.error("Помилка отримання послуг:", err);
        res.status(500).json({ message: "Помилка сервера" });
    }
});


router.get("/filter", async (req, res) => {
    try {
        const { startDate, endDate, category } = req.query;

        let filter = {};


        if (startDate || endDate) {
            filter.date = {};
            if (startDate) filter.date.$gte = new Date(startDate);
            if (endDate) {
                const end = new Date(endDate);
                end.setDate(end.getDate() + 1);
                filter.date.$lt = end;
            }
        }

        const categoryMap = {
            consultation: "Консультація",
            procedure: "Процедура"
        };

        if (category && category !== "all") {
            filter.serviceCategory = categoryMap[category] || category;
        }

        const services = await ProvidedService.find(filter).sort({ date: -1 });
        res.json(services);
    } catch (err) {
        console.error("Помилка фільтрації послуг:", err);
        res.status(500).json({ message: "Помилка сервера" });
    }
});

module.exports = router;