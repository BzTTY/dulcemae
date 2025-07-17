// backend/routes/orderRoutes.js
const express = require('express');
const router = express.Router();

// Importamos el controlador que contendrá la lógica
const { createOrder } = require('../controllers/orderController');

// @route   POST /api/orders
// @desc    Crear un nuevo pedido
// @access  Public (cualquiera puede crear un pedido)
router.post('/', createOrder);


module.exports = router;