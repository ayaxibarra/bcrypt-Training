const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // 1. Extraer el encabezado de autorización
    const authHeader = req.headers.authorization;

    // 2. Verificar que exista el encabezado y que comience con "Bearer "
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Acceso no autorizado. Token faltante o malformado.' });
    }

    // 3. Extraer el token separando el "Bearer" del token propiamente dicho
    const token = authHeader.split(' ')[1];

    try {
        // 4. Verificar y decodificar el token usando la clave secreta
        const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);

        // 5. Adjuntar el payload decodificado al objeto req para que la ruta lo pueda usar
        req.user = decodedPayload;

        // 6. Continuar con la ejecución de la ruta (controlador)
        next();
    } catch (error) {
        // 7. Si falla la verificación (token expirado o falso), devolver error 403
        return res.status(403).json({ message: 'Token inválido o expirado.' });
    }
};

module.exports = verifyToken;