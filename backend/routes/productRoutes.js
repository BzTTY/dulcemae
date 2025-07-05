const express = require('express');
const router = express.Router();

// Importamos los controladores de productos
const { getAllProducts, getProductById } = require('../controllers/productController');

// @route   GET /api/products
// @desc    Obtener todos los productos
// @access  Public
router.get('/', getAllProducts);

// @route   GET /api/products/:id
// @desc    Obtener un producto por su ID
// @access  Public
router.get('/:id', getProductById);

// Más adelante aquí podrían ir rutas POST, PUT, DELETE para administrar productos
// si se implementa un panel de administrador. Esas rutas estarían protegidas.
// Ejemplo: router.post('/', protect, adminMiddleware, createProduct);

module.exports = router;