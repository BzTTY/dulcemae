// backend/controllers/orderController.js
const Order = require('../models/Order');

// En el futuro, aquí configurarías tu servicio de envío de emails
// const sendEmail = require('../utils/sendEmail');

/**
 * @desc    Controlador para crear un nuevo pedido
 * @route   POST /api/orders
 * @access  Public
 */
const createOrder = async (req, res) => {
  // Extraemos los datos del cuerpo de la solicitud (lo que envía el formulario)
  const { nombreCliente, correo, telefono, direccion, notas, items, total } = req.body;

  // Verificación básica de que recibimos los datos necesarios
  if (!nombreCliente || !correo || !telefono || !direccion || !items || items.length === 0) {
    return res.status(400).json({ message: 'Faltan datos para crear el pedido.' });
  }

  try {
    // Creamos una nueva instancia del modelo Order con los datos recibidos
    const newOrder = new Order({
      nombreCliente: nombreCliente,
      correo: correo,
      telefono: telefono,
      direccion_envio: direccion, // Asegúrate de que el nombre del campo coincida con tu modelo
      notas: notas,
      items: items,
      total: total,
      // El estado por defecto será 'Pendiente' según el modelo
    });

    // Guardamos el nuevo pedido en la base de datos
    const savedOrder = await newOrder.save();

    // --- LÓGICA PARA ENVIAR CORREO (PARA EL FUTURO) ---
    // try {
    //   const message = `Hola ${savedOrder.nombreCliente}, hemos recibido tu pedido #${savedOrder._id}. El total es de $${savedOrder.total}. Pronto nos pondremos en contacto para coordinar el pago y la entrega.`;
    //   await sendEmail({
    //     to: savedOrder.correo,
    //     subject: 'Confirmación de Pedido - Dulce Mae',
    //     text: message
    //   });
    // } catch (emailError) {
    //   console.error("El pedido se guardó, pero falló el envío de correo:", emailError);
    //   // No devolvemos un error al cliente, ya que el pedido SÍ se creó.
    // }
    // -----------------------------------------------------

    // Si todo va bien, enviamos una respuesta de éxito (201) con los datos del pedido guardado.
    res.status(201).json({ message: 'Pedido creado exitosamente', order: savedOrder });

  } catch (error) {
    // Si hay un error (ej. de validación de Mongoose o de conexión a la BD),
    // lo registramos y enviamos un error 500.
    console.error('Error al crear el pedido:', error);
    res.status(500).json({ message: 'Error interno del servidor al crear el pedido.', error: error.message });
  }
};

// Exportamos la función para que las rutas puedan usarla
module.exports = {
  createOrder,
};