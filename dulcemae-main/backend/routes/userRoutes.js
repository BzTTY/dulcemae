const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Ruta de prueba
router.get("/", (req, res) => {
  res.send("Ruta de usuarios funcionando correctamente 🚀");
});

// Registro
router.post("/register", async (req, res) => {
  const { nombre, telefono, email, password } = req.body;

  try {
    const existe = await User.findOne({ email });
    if (existe) return res.status(400).json({ message: "El correo ya está registrado." });

    const hashedPassword = await bcrypt.hash(password, 10);
    const nuevoUsuario = new User({ nombre, telefono, email, password: hashedPassword });

    await nuevoUsuario.save();
    res.status(201).json({ message: "Usuario registrado correctamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al registrar el usuario." });
  }
});

// Login - MODIFICADO para incluir información del usuario
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await User.findOne({ email });
    if (!usuario) return res.status(400).json({ message: "Correo no encontrado." });

    const valida = await bcrypt.compare(password, usuario.password);
    if (!valida) return res.status(400).json({ message: "Contraseña incorrecta." });

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: "2h" });

    // ✅ INCLUIR INFORMACIÓN DEL USUARIO EN LA RESPUESTA
    res.json({ 
      message: "Login exitoso",
      token: token,
      nombre: usuario.nombre, // ✅ El frontend espera esto
      user: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        telefono: usuario.telefono
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al iniciar sesión." });
  }
});

module.exports = router;