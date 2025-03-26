const express = require('express');
const UserController = require('../controllers/AuthenticationController');
const { verifyJWT }    = require('../middleware/verifyJWT');

const router = express.Router();

// Rutas públicas para autenticación
router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);

// Rutas para manejo de tokens y logout
router.post('/refresh-token', UserController.refreshToken);
router.post('/logout',        UserController.logoutUser);

router.get('/me', verifyJWT ,UserController.getCurrentUser);


module.exports = router;
