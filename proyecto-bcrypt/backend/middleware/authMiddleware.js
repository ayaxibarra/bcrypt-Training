// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
 
    // 1. Verificamos que el encabezado y el token existan y comiencen con 'Bearer '
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1]; // Extraemos el token limpio
 
        // 2. Verificamos el token usando nuestra clave secreta
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedPayload) => {
            if (err) {
                // Si el token no es válido (expirado, manipulado, etc.)
                return res.status(403).json({ message: 'Token inválido o expirado' });
            }
 
            // 3. Si es válido, guardamos la información del usuario en req.user
            req.user = decodedPayload;
            next(); // 4. ¡Todo bien! Dejamos que la petición continúe hacia la ruta final
        });
    } else {
        // Si no hay token en los headers, bloqueamos el acceso
        res.status(401).json({ message: 'No estás autenticado, falta el token' });
    }
};

module.exports = verifyToken;