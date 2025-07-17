// backend/controllers/productController.js

const Product = require('../models/Product'); // Importamos el modelo de Producto

/**
 * @desc    Controlador para obtener todos los productos disponibles.
 * @route   GET /api/products
 * @access  Public
 */
const getAllProducts = async (req, res) => {
  try {
    // Buscamos todos los productos que estén marcados como 'disponible: true'.
    // Esto es útil para no mostrar en la tienda productos que están fuera de stock o desactivados.
    const products = await Product.find({ disponible: true });

    // Si no se encuentran productos, puedes decidir si enviar un array vacío (lo normal) o un mensaje.
    // Enviar un array vacío es generalmente mejor para que el frontend no falle.
    res.json(products);

  } catch (err) {
    console.error('Error en el controlador getAllProducts:', err.message);
    res.status(500).json({ message: 'Error del Servidor al obtener los productos.' });
  }
};

/**
 * @desc    Controlador para obtener un único producto por su ID.   
 * @route   GET /api/products/:id
 * @access  Public
 */
const getProductById = async (req, res) => {
  try {
    // Obtenemos el ID de los parámetros de la URL (ej: /api/products/A1B2C3D4)
    const product = await Product.findById(req.params.id);

    // Si Mongoose no encuentra un producto con ese ID, `product` será null.
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado.' });
    }

    // Si el producto se encuentra, lo devolvemos como JSON.
    res.json(product);

  } catch (err) {
    console.error('Error en el controlador getProductById:', err.message);

    // Este chequeo es útil porque si el ID proporcionado no tiene un formato de ObjectId válido,
    // Mongoose arrojará un error de tipo 'CastError'.
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'ID de producto inválido.' });
    }

    res.status(500).json({ message: 'Error del Servidor.' });
  }
};

// Exportamos las funciones para que puedan ser usadas en productRoutes.js
module.exports = {
  getAllProducts,
  getProductById,
};