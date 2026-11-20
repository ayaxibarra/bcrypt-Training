const express = require('express');
const router = express.Router();

// 1. Importamos controladores y middlewares de seguridad
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController.js');

const authMiddleware = require('../middleware/authMiddleware.js');
const adminGuard = require('../middleware/adminGuard.js');

// 2. Rutas públicas (lectura libre)
router.route('/')
  .get(getAllProducts)
  .post(authMiddleware, adminGuard, createProduct); // Protegido: Auth + Admin

router.route('/:id')
  .get(getProductById)
  .put(authMiddleware, adminGuard, updateProduct)    // Protegido: Auth + Admin
  .delete(authMiddleware, adminGuard, deleteProduct); // Protegido: Auth + Admin

module.exports = router;