const ProvidedService = require("../models/provided_services_model");
const Service = require("../models/service_model");

const consultationCoefficients = {
    "Молодший спеціаліст": 0.7,
    "Спеціаліст": 1,
    "Лікар вищої категорії": 1.2,
    "Доктор медчних наук": 1.5
};

const ageDiscount = (birthYear) => {
    const age = new Date().getFullYear() - birthYear;
    if (age < 18) return 0.8;
    if (age > 65) return 0.85;
    return 1;
};

async function createProvidedServices({ doctor, patient, services = [], date }) {

    const consultationService = await Service.findOne({ category: "Консультація" });

    let baseConsultationPrice = 0;
    if (consultationService) {
        baseConsultationPrice = consultationService.price * (consultationCoefficients[doctor.category] || 1);
    }
    const discountMultiplier = ageDiscount(patient.birthYear);
    const discountedConsultationPrice = baseConsultationPrice * discountMultiplier;

    const providedServices = [];


    providedServices.push({
        serviceName: `Консультація лікаря ${doctor.category}`,
        serviceCategory: "Консультація",
        date: new Date(date),
        price: baseConsultationPrice,
        discountedPrice: discountedConsultationPrice
    });


    for (const s of services) {
        if (s.category === "Консультація") continue;

        const price = s.price;
        const discountedPrice = price * discountMultiplier;

        providedServices.push({
            serviceName: s.name,
            serviceCategory: s.category,
            date: new Date(date),
            price,
            discountedPrice
        });
    }

    const saved = await ProvidedService.insertMany(providedServices);

    const totalPrice = saved.reduce((sum, s) => sum + (s.discountedPrice || 0), 0);
    const fullPrice = saved.reduce((sum, s) => sum + (s.price || 0), 0);

    return { saved, totalPrice, fullPrice };

}

module.exports = {
    createProvidedServices
};