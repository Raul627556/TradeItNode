const express = require('express');
const UserController = require('../controllers/AuthenticationController');

const router = express.Router();

// Rutas públicas para autenticación
router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);

module.exports = router;
