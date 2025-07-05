const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  nombre_completo: {
    type: String,
    required: [true, 'El nombre completo es obligatorio'],
    trim: true,
  },
  celular: {
    type: String,
    required: [true, 'El número de celular es obligatorio'],
    trim: true,
    // Puedes añadir una validación de formato regex si lo deseas, ej:
    // match: [/^[0-9]{9,15}$/, 'Por favor, introduce un número de celular válido']
  },
  correo: {
    type: String,
    required: [true, 'El correo electrónico es obligatorio'],
    unique: true, // Asegura que no haya dos usuarios con el mismo correo
    trim: true,
    lowercase: true, // Guarda los correos en minúsculas para consistencia
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Por favor, introduce un correo electrónico válido',
    ],
  },
  contrasena: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
    minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
    // No guardamos la contraseña directamente, sino su hash
    // No seleccionamos la contraseña por defecto al buscar usuarios
    select: false, 
  },
  // Timestamps para saber cuándo fue creado/actualizado el usuario
}, { timestamps: true });

// Middleware para hashear la contraseña ANTES de guardarla en la BD
userSchema.pre('save', async function (next) {
  // Solo hashear la contraseña si ha sido modificada (o es nueva)
  if (!this.isModified('contrasena')) {
    return next();
  }
  // Generar el "salt" y hashear la contraseña
  const salt = await bcrypt.genSalt(10); // 10 es un buen valor por defecto para el "cost factor"
  this.contrasena = await bcrypt.hash(this.contrasena, salt);
  next();
});

// Método para comparar la contraseña ingresada con la hasheada en la BD
userSchema.methods.compararContrasena = async function (contrasenaIngresada) {
  return await bcrypt.compare(contrasenaIngresada, this.contrasena);
};

const User = mongoose.model('User', userSchema);

module.exports = User;