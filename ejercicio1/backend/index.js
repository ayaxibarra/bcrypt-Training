const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Conexión a MongoDB (actualizada sin opciones obsoletas)
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('🟢 Conectado exitosamente a MongoDB'))
.catch((err) => console.error('🔴 Error de conexión a MongoDB:', err));

// Rutas de la API
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor backend corriendo en el puerto ${PORT}`);
});