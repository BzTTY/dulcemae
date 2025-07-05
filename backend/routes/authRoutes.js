const express = require('express');
const router = express.Router();

// Importamos los controladores
const { registerUser, loginUser, getMe } = require('../controllers/authController');
// Importamos el middleware de protección
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/auth/register
// @desc    Registrar un nuevo usuario
// @access  Public
router.post('/register', registerUser);

// @route   POST /api/auth/login
// @desc    Autenticar un usuario y obtener token
// @access  Public
router.post('/login', loginUser);

// @route   GET /api/auth/me
// @desc    Obtener información del usuario logueado (protegida)
// @access  Private
router.get('/me', protect, getMe); // <-- ASEGÚRATE DE QUE ESTA LÍNEA ESTÉ ASÍ, DESCOMENTADA Y CON 'protect'

module.exports = router;    