const Appointment = require("../models/appointment_model");
const ProvidedService = require("../models/provided_services_model");
const Doctor = require("../models/doctor_model");
const Patient = require("../models/patient_model");
const { createProvidedServices } = require("../services/providedServices");
const Service = require("../models/service_model");

const consultationCoefficients = {
    "Молодший спеціаліст": 1,
    "Спеціаліст": 1.2,
    "Лікар вищої категорії": 1.5,
    "Доктор медчних наук": 2
};

const ageDiscount = (birthYear) => {
    const age = new Date().getFullYear() - birthYear;
    if (age < 18) return 0.8;
    if (age > 65) return 0.85;
    return 1;
};

async function createAppointment(req, res) {
    try {
        const { doctorId, patientId, diagnosis, diagnosisDescription, treatmentDescription, services: additionalServiceIds, date } = req.body;

        const doctor = await Doctor.findById(doctorId);
        const patient = await Patient.findById(patientId);

        if (!doctor || !patient) {
            return res.status(400).json({ message: "Лікар або пацієнт не знайдені" });
        }

        const allServices = await Service.find({ _id: { $in: additionalServiceIds } });

        const { saved, totalPrice, fullPrice } = await createProvidedServices({ doctor, patient, services: allServices, date });


        const newAppointment = new Appointment({
            doctor: doctor._id,
            patient: patient._id,
            date: new Date(date),
            diagnosis,
            diagnosisDescription,
            treatmentDescription,
            services: allServices.map(s => s._id),
            basicPrice: fullPrice,
            price: totalPrice

        });



        // newAppointment.price = totalPrice;

        await newAppointment.save();

        res.status(201).json({ appointment: newAppointment, providedServices: saved });

    } catch (err) {
        console.error("Помилка створення звернення:", err);
        res.status(500).json({ message: "Помилка сервера" });
    }
}

module.exports = {
    createAppointment
};