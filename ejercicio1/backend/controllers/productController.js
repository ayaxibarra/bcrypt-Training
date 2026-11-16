const asyncHandler = require('express-async-handler');
const Product = require('../models/Product.js');

// @desc    Obtener todos los productos
// @route   GET /api/productos
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc    Obtener un producto por ID
// @route   GET /api/productos/:id
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Producto no encontrado');
  }
});

// @desc    Crear un nuevo producto
// @route   POST /api/productos
const createProduct = asyncHandler(async (req, res) => {
  const { nombre, precio, descripcion, imagenUrl, stock } = req.body;
  const product = new Product({ nombre, precio, descripcion, imagenUrl, stock });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Actualizar un producto
// @route   PUT /api/productos/:id
const updateProduct = asyncHandler(async (req, res) => {
  const { nombre, precio, descripcion, imagenUrl, stock } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    product.nombre = nombre || product.nombre;
    product.precio = precio !== undefined ? precio : product.precio;
    product.descripcion = descripcion || product.descripcion;
    product.imagenUrl = imagenUrl || product.imagenUrl;
    product.stock = stock !== undefined ? stock : product.stock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Producto no encontrado');
  }
});

// @desc    Eliminar un producto
// @route   DELETE /api/productos/:id
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.deleteOne();
    res.json({ message: 'Producto eliminado' });
  } else {
    res.status(404);
    throw new Error('Producto no encontrado');
  }
});

// Exportamos todas nuestras funciones controladoras
module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};