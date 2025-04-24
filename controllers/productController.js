const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
    try {
        const { name, tiempo_inicio, description, user_id, status } = req.body;

        if (!name || !user_id) {
            return res.status(400).json({ message: 'El nombre y el user_id son obligatorios' });
        }

        const newProduct = new Product({
            name,
            tiempo_inicio,
            description,
            user_id,
            status
        });

        const savedProduct = await newProduct.save();
        res.status(201).json({ message: 'Producto guardado con éxito', product: savedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error al guardar el producto', error: error.message });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los productos', error: error.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el producto', error: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: 'Producto no encontrado' });
        res.status(200).json({ message: 'Producto actualizado', product: updated });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
    }
};

exports.partialUpdateProduct = async (req, res) => {
    try {
        const updated = await Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        if (!updated) return res.status(404).json({ message: 'Producto no encontrado' });
        res.status(200).json({ message: 'Producto actualizado parcialmente', product: updated });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar parcialmente', error: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const deleted = await Product.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Producto no encontrado' });
        res.status(200).json({ message: 'Producto eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
    }
};

exports.getProductsByUser = async (req, res) => {
    try {
        const products = await Product.find({ user_id: req.params.userId });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener productos del usuario', error: error.message });
    }
};

exports.getProductsByCategory = async (req, res) => {
    try {
        const products = await Product.find({ categories: req.params.categoryId });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener productos por categoría', error: error.message });
    }
};

exports.bookProduct = async (req, res) => {
    try {
        const updated = await Product.findByIdAndUpdate(req.params.id, { status: 'booked' }, { new: true });
        if (!updated) return res.status(404).json({ message: 'Producto no encontrado' });
        res.status(200).json({ message: 'Producto marcado como reservado', product: updated });
    } catch (error) {
        res.status(500).json({ message: 'Error al reservar el producto', error: error.message });
    }
};

exports.requestTrade = async (req, res) => {
    try {
        // Esto debería guardar una propuesta en otra colección, pero aquí va un ejemplo de respuesta
        res.status(200).json({ message: 'Solicitud de trueque enviada (ejemplo)' });
    } catch (error) {
        res.status(500).json({ message: 'Error al solicitar trueque', error: error.message });
    }
};
