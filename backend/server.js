// backend/server.js

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Importación de todas tus rutas
const userRoutes = require("./routes/userRoutes");
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes'); // <-- ASEGÚRATE DE QUE ESTA LÍNEA ESTÉ DESCOMENTADA

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Permite solicitudes de otros dominios (tu frontend)
app.use(express.json()); // Permite al servidor entender JSON

// Rutas de la API
app.use("/api/users", userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes); // <-- ASEGÚRATE DE QUE ESTA LÍNEA ESTÉ DESCOMENTADA Y CORRECTA

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch((err) => console.error("❌ Error al conectar MongoDB:", err));

app.get("/", (req, res) => {
  res.send("API de DulceMae funcionando correctamente 🎂");
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
  console.log(`🔗 Ruta de autenticación (auth): http://localhost:${PORT}/api/auth/`);
  console.log(`🔗 Ruta de usuarios (users): http://localhost:${PORT}/api/users/`);
  console.log(`🔗 Ruta de productos (products): http://localhost:${PORT}/api/products/`);
  console.log(`🔗 Ruta de pedidos (orders): http://localhost:${PORT}/api/orders/`); // Log de ayuda
});