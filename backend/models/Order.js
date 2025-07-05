const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  productos: [
    {
      producto_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      nombre: {
        type: String,
        required: true,
      },
      cantidad: {
        type: Number,
        required: true,
        min: [1, 'La cantidad debe ser al menos 1'],
      },
      precio_unitario: {
        type: Number,
        required: true,
      },
    },
  ],
  direccion_envio: {
    type: String,
    required: [true, 'La dirección de envío es obligatoria'],
    trim: true,
  },
  total_pedido: {
    type: Number,
    required: true,
  },
  estado_pedido: {
    type: String,
    required: true,
    enum: ['Pendiente', 'Pagado', 'En preparación', 'Enviado', 'Entregado', 'Cancelado'],
    default: 'Pendiente',
  },
  fecha_pedido: {
    type: Date,
    default: Date.now,
  },
  // Podríamos añadir un campo para el método de pago más adelante
  // metodo_pago: String,
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;