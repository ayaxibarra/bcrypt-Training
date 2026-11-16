const express = require('express');
const router = express.Router();

// Controladores
const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

// Middlewares de seguridad
const verifyToken = require('../middleware/authMiddleware');
const adminGuard = require('../middleware/adminGuard'); // 👈 Importamos el guardián de admin

// Rutas públicas (GET) y protegidas por rol de administración (POST, PUT, DELETE)
router.route('/')
    .get(getAllProducts)
    .post(verifyToken, adminGuard, createProduct); // 👈 Doble filtro: token válido + rol admin

router.route('/:id')
    .get(getProductById)
    .put(verifyToken, adminGuard, updateProduct)    // 👈 Doble filtro
    .delete(verifyToken, adminGuard, deleteProduct); // 👈 Doble filtro

module.exports = router;