const Product = require('../models/Product.js'); // Importamos el modelo Product

// @desc    Obtener todos los productos
// @route   GET /api/products
// @access  Public
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}); // Encuentra todos los documentos en la colección Product
    // Podríamos añadir filtros o paginación aquí más adelante
    res.status(200).json(products);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ message: 'Error del servidor al obtener los productos' });
  }
};

// @desc    Obtener un solo producto por su ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener el producto por ID:', error);
    // Si el ID no tiene un formato válido de ObjectId de MongoDB, findById lanzará un error
    if (error.kind === 'ObjectId') {
        return res.status(404).json({ message: 'Producto no encontrado (ID inválido)' });
    }
    res.status(500).json({ message: 'Error del servidor al obtener el producto' });
  }
};

// Más adelante podríamos añadir funciones para crear, actualizar y eliminar productos
// si necesitas un panel de administración.

module.exports = {
  getAllProducts,
  getProductById,
};