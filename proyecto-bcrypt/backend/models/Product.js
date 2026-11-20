const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  imagenUrl: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
}, {
  timestamps: true, // Añade automáticamente createdAt y updatedAt
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;