const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const app = express();
const router = express.Router();
const cors = require('cors');
const patientsRouter = require('./routes/patient_route');
const doctorsRouter = require('./routes/doctor_route');
const servicesRouter = require('./routes/service_route');
const appointmentsRouter = require('./routes/appointment_route');
const reportRouter = require('./routes/provided_services_route');
const authRoutes = require('./routes/auth_route');

const port = 3000;

app.use(cors());
app.use(express.json());
app.use('/patients', patientsRouter);
app.use('/doctors', doctorsRouter);
app.use('/services', servicesRouter);
app.use('/appointments', appointmentsRouter);
app.use('/report', reportRouter);
app.use('/api/auth', authRoutes);

mongoose.connect('mongodb+srv://db_user:db_password@clusterts.o39dbv9.mongodb.net/Private_clinic?retryWrites=true&w=majority&appName=ClusterTS')
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Clinic API',
            version: '1.0.0',
            description: 'API documentation using Swagger',
        },
        servers: [
            {
                url: `http://localhost:${port}`,
            },
        ],
    },
    apis: ['./routes/*.js', "./models/*.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/', (req, res) => {
    res.send('Backend for clinic app is working 🚑');
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});