// backend/models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  // Hacemos el campo de usuario opcional por ahora.
  // Si el usuario está logueado, lo guardaremos. Si no, será null.
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // No es requerido para pedidos de invitados
  },
  // Campos para clientes no registrados (invitados)
  nombreCliente: {
    type: String,
    required: true,
    trim: true
  },
  correo: {
    type: String,
    required: true,
    trim: true
  },
  telefono: {
    type: String,
    required: true,
    trim: true
  },
  // Productos en el pedido
  items: [
    {
      _id: { type: String, required: true }, // Guardamos el ID como string
      nombre: { type: String, required: true },
      quantity: { type: Number, required: true },
      precio: { type: Number, required: true }
    }
  ],
  direccion_envio: {
    type: String,
    required: [true, 'La dirección de envío es obligatoria'],
    trim: true,
  },
  total: {
    type: Number,
    required: true,
  },
  estado: {
    type: String,
    required: true,
    enum: ['Pendiente', 'Confirmado', 'En preparación', 'Enviado', 'Entregado', 'Cancelado'],
    default: 'Pendiente',
  },
  notas: {
      type: String,
      trim: true
  }
}, { timestamps: true }); // timestamps agrega createdAt y updatedAt automáticamente

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;