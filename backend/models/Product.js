const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre del producto es obligatorio'],
    trim: true,
  },
  descripcion: {
    type: String,
    required: [true, 'La descripción del producto es obligatoria'],
    trim: true,
  },
  precio: {
    type: Number,
    required: [true, 'El precio del producto es obligatorio'],
    min: [0, 'El precio no puede ser negativo'],
  },
  imagenUrl: {
    type: String,
    trim: true,
  },
  categoria: {
    type: String,
    required: [true, 'La categoría del producto es obligatoria'],
    trim: true,
  },
  disponible: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;