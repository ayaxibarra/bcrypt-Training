const mongoose = require('mongoose');
 
// Creamos una función asíncrona para la conexión
const conectarDB = async () => {
  try {
    // Usamos await para esperar que la promesa de la conexión se resuelva
    // process.env.MONGO_URI viene de nuestro archivo .env
    await mongoose.connect(process.env.MONGO_URI);
    
    console.log('MongoDB conectado exitosamente. ✅');
 
  } catch (error) {
    console.error(`Error al conectar con la base de datos: ${error.message}`);
    
    // Si la conexión falla, detenemos la ejecución de la aplicación.
    // Si la app no puede hablar con su base de datos, no puede funcionar.
    process.exit(1); 
  }
};
 
// Exportamos la función para poder usarla en nuestro archivo principal
module.exports = conectarDB;