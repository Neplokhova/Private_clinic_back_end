const express = require("express");
const router = express.Router();
const ProvidedService = require("../models/provided_services_model");

/**
 * @swagger
 * /report:
 *   get:
 *     summary: Get all provided services
 *     tags: [ProvidedServices]
 *     responses:
 *       200:
 *         description: List of provided services sorted by date descending
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProvidedService'
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

router.get("/", async (req, res) => {
    try {
        const services = await ProvidedService.find().sort({ date: -1 });
        res.json(services);
    } catch (err) {
        console.error("Помилка отримання послуг:", err);
        res.status(500).json({ message: "Помилка сервера" });
    }
});

/**
 * @swagger
 * /report/filter:
 *   get:
 *     summary: Filter provided services by date range and category
 *     tags: [ProvidedServices]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for filtering (inclusive)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for filtering (inclusive)
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [all, consultation, procedure]
 *         description: Service category to filter by ("all" for no filter)
 *     responses:
 *       200:
 *         description: List of filtered provided services
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProvidedService'
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