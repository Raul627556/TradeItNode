const express = require('express');
const UserController = require('../controllers/AuthenticationController');

const router = express.Router();

// Rutas públicas para autenticación
router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);

// Rutas para manejo de tokens y logout
router.post('/refresh-token', UserController.refreshToken);
router.post('/logout',        UserController.logoutUser);

module.exports = router;
