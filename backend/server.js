const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Importación de rutas
const userRoutes = require("./routes/userRoutes"); 
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes'); // <--- AÑADE ESTA LÍNEA (Importación)
// const orderRoutes = require('./routes/orderRoutes'); // (Dejamos comentada la de pedidos por ahora)

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas de la API
app.use("/api/users", userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes); // <--- AÑADE ESTA LÍNEA (Uso de las rutas)
// app.use('/api/orders', orderRoutes); // (Dejamos comentada la de pedidos por ahora)

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
  console.log(`🔗 Ruta de productos (products): http://localhost:${PORT}/api/products/`); // <--- AÑADE ESTE LOG (Opcional, para ayuda)
});