const Product = require('../models/Product'); // Importamos el modelo de Producto

// Crear un nuevo producto
exports.createProduct = async (req, res) => {
    try {
        const { name, tiempo_inicio, description, user_id, status } = req.body;

        // Validar datos obligatorios
        if (!name || !user_id) {
            return res.status(400).json({ message: 'El nombre y el user_id son obligatorios' });
        }

        // Crear el producto
        const newProduct = new Product({
            name,
            tiempo_inicio,
            description,
            user_id,
            status
        });

        // Guardar en la base de datos
        const savedProduct = await newProduct.save();

        res.status(201).json({ message: 'Producto guardado con éxito', product: savedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al guardar el producto', error: error.message });
    }
};
