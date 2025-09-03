const express = require('express');
const mongoose = require('mongoose');
const app = express();
const router = express.Router();
const patientsRouter = require('./routes/patient_route');

const port = 3000;

app.use(express.json());
app.use('/patients', patientsRouter);

mongoose.connect('mongodb+srv://db_user:db_password@clusterts.o39dbv9.mongodb.net/Private_clinic?retryWrites=true&w=majority&appName=ClusterTS')
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Backend for clinic app is working 🚑');
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});