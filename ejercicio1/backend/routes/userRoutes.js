const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware'); // Importamos el guardia

// ... (tus rutas anteriores de /register y /login se quedan igual)

// ==========================================
// RUTA PROTEGIDA DE PERFIL (Ejercicio 4)
// ==========================================
router.get('/profile', authMiddleware, (req, res) => {
    // Si el middleware 'authMiddleware' pasa con éxito, 
    // podemos acceder a 'req.user' que contiene el ID y username decodificados.
    res.status(200).json({
        message: '¡Bienvenido a tu perfil protegido!',
        user: req.user
    });
});

module.exports = router;