// middleware/adminGuard.js
const adminGuard = (req, res, next) => {
    // Verificamos si el usuario existe y si su rol es 'admin'
    if (req.user && req.user.rol === 'admin') {
        next(); // Es admin, dejamos pasar la petición
    } else {
        return res.status(403).json({ 
            message: 'Acceso denegado. Se requiere rol de administrador.' 
        });
    }
};

module.exports = adminGuard;