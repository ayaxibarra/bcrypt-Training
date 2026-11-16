// index.js (o server.js)
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const conectarDB = require('./config/db'); // 👈 Importamos desde la carpeta config

const userRoutes = require('./routes/userRoutes');

const app = express();

// 1. Conectar a la base de datos
conectarDB();

// 2. Middlewares
app.use(express.json());
app.use(cors());

// 3. Rutas de la API
app.use('/api/users', userRoutes);

// 4. Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor backend corriendo en el puerto ${PORT}`);
});