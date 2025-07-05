const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Función para generar el JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Registrar un nuevo usuario
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { nombre_completo, celular, correo, contrasena } = req.body;
    if (!nombre_completo || !celular || !correo || !contrasena) {
      return res.status(400).json({ message: 'Por favor, incluye todos los campos' });
    }
    const userExists = await User.findOne({ correo });
    if (userExists) {
      return res.status(400).json({ message: 'El usuario con este correo ya existe' });
    }
    const user = await User.create({
      nombre_completo,
      celular,
      correo,
      contrasena,
    });
    if (user) {
      res.status(201).json({
        _id: user._id,
        nombre_completo: user.nombre_completo,
        correo: user.correo,
        celular: user.celular,
        token: generateToken(user._id),
        message: 'Usuario registrado exitosamente',
      });
    } else {
      res.status(400).json({ message: 'Datos de usuario inválidos o error al crear el usuario' });
    }
  } catch (error) {
    console.error('Error en registerUser:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Error del servidor al registrar el usuario' });
  }
};

// @desc    Autenticar un usuario (login)
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;
    if (!correo || !contrasena) {
      return res.status(400).json({ message: 'Por favor, ingresa correo y contraseña' });
    }
    const user = await User.findOne({ correo }).select('+contrasena');
    if (!user || !(await user.compararContrasena(contrasena))) {
      return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
    }
    res.status(200).json({
      _id: user._id,
      nombre_completo: user.nombre_completo,
      correo: user.correo,
      celular: user.celular,
      token: generateToken(user._id),
      message: 'Inicio de sesión exitoso',
    });
  } catch (error) {
    console.error('Error en loginUser:', error);
    res.status(500).json({ message: 'Error del servidor al intentar iniciar sesión' });
  }
};

// @desc    Obtener información del usuario logueado
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  // El middleware 'protect' ya habrá puesto el usuario en req.user
  // Si llegamos aquí, el usuario está autenticado.
  // req.user fue poblado por el middleware protect y no incluye la contraseña.
  if (req.user) {
    res.status(200).json({
      _id: req.user._id,
      nombre_completo: req.user.nombre_completo,
      correo: req.user.correo,
      celular: req.user.celular,
      // Cualquier otro campo que quieras devolver y no sea sensible
    });
  } else {
    // Este caso no debería ocurrir si el middleware protect funciona bien
    res.status(404).json({ message: 'Usuario no encontrado' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};