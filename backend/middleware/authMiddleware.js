const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Necesitamos el modelo para buscar al usuario

const protect = async (req, res, next) => {
  let token;

  // Los tokens JWT usualmente se envían en el header 'Authorization' como 'Bearer <token>'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 1. Obtener el token del header (quitando 'Bearer ')
      token = req.headers.authorization.split(' ')[1];

      // 2. Verificar el token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Obtener el usuario del token y adjuntarlo al objeto 'req'
      // Excluimos la contraseña al seleccionar el usuario
      req.user = await User.findById(decoded.id).select('-contrasena');

      if (!req.user) {
        // Si el usuario ya no existe (ej. fue eliminado después de emitir el token)
        return res.status(401).json({ message: 'No autorizado, usuario no encontrado tras verificar token' });
      }

      next(); // Si todo está bien, pasar al siguiente middleware o al controlador
    } catch (error) {
      console.error('Error de autenticación de token:', error.name, error.message);
      // Distinguir errores comunes de JWT
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'No autorizado, token malformado o firma inválida' });
      }
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'No autorizado, el token ha expirado' });
      }
      return res.status(401).json({ message: 'No autorizado, token falló' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'No autorizado, no se proporcionó token' });
  }
};

module.exports = { protect };