const express = require('express');
require('dotenv').config(); // Carga las variables de entorno
const conectarDB = require('./config/db'); // 1. Importamos nuestra función de conexión
 
const app = express();
 
// 2. Conectar a la Base de Datos
conectarDB();
 
// Middleware
app.use(express.json());
 
// Definición de Rutas
app.use('/api/productos', require('./routes/productRoutes'));
app.use('/api/usuarios', require('./routes/userRoutes'));
 
// ... (Manejador de errores, etc.)
 
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));