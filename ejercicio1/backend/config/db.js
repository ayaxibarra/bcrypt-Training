// config/db.js
const mongoose = require('mongoose');

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('🟢 Conectado exitosamente a MongoDB');
    } catch (error) {
        console.error('🔴 Error de conexión a MongoDB:', error.message);
        process.exit(1); // Detiene la aplicación si hay un fallo crítico
    }
};

module.exports = conectarDB;