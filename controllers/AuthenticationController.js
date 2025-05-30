require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateTokens } = require('../services/auth.service');
const User = require('../models/User');

// Comprueba si la cuenta está bloqueada
const isLocked = (user) => {
    return user.account.lockUntil && user.account.lockUntil > Date.now();
};

const registerUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Validación básica
      if (!name || !email || !password) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
      }
  
      // Verificar si el email ya está registrado
      const existingUser = await User.findOne({ 'personalInfo.email': email });
      if (existingUser) {
        return res.status(400).json({ error: 'El email ya está registrado' });
      }
  
      // Hashear la contraseña
      const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);
  
      // Crear nuevo usuario
      const newUser = new User({
        personalInfo: { name, email },
        account: { passwordHash }
      });
  
      // Guardar usuario en base de datos
      await newUser.save();
  
      return res.status(201).json({
        message: 'Usuario registrado correctamente',
        user: {
          id: newUser._id,
          name: newUser.personalInfo.name,
          email: newUser.personalInfo.email
        }
      });
  
    } catch (error) {
      console.error('Register error:', error);
  
      // Detectar error de duplicado por índice único (email)
      if (error.code === 11000) {
        return res.status(400).json({ error: 'Este email ya está en uso'+ error.message });
      }
  
      return res.status(500).json({ error: 'Error al registrar el usuario' });
    }
  };
  

const loginUser = async (req, res) => {
    try {
        const { identifier, password } = req.body;

        const user = await User.findOne({
            $or: [
                { 'account.username': identifier },
                { 'personalInfo.email': identifier }
            ]
        });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username/email or password' });
        }

        if (isLocked(user)) {
            return res.status(403).json({ error: 'Account locked. Try again later.' });
        }

        const isMatch = await bcrypt.compare(password, user.account.passwordHash);
        user.account.loginAttempts = (user.account.loginAttempts || 0) + 1;

        if (!isMatch) {
            // Si llega al límite de 5 intentos, bloquea 30 minutos
            if (user.account.loginAttempts >= 5) {
                user.account.lockUntil = Date.now() + 30 * 60 * 1000;
            }
            await user.save();
            return res.status(401).json({ error: 'Invalid username/email or password' });
        }

        user.account.loginAttempts = 0;
        user.account.lockUntil = null;
        user.account.last_login = Date.now();


        const { accessToken, refreshToken: newRefresh } = generateTokens(user._id);

        user.account.tokens = user.account.tokens || [];
        user.account.tokens.push({ token: newRefresh });
        await user.save();

        const isProduction = process.env.NODE_ENV === 'production';
        res
            .cookie('refreshToken', newRefresh, {
                httpOnly: true,
                secure: isProduction,
                sameSite: isProduction ? 'None' : 'Lax',
                maxAge: 1000 * 60 * 60 * 24 * 7,
                path: '/refresh',
            })
            .json({ message: 'Login successful', accessToken });

    } catch (error) {
        res.status(500).json({ error: 'Error logging in' + error});
    }
};

const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        if (!token) {
            return res.status(401).json({ error: 'No refresh token provided' });
        }

        let payload;
        try {
            payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        } catch (err) {
            return res.status(401).json({ error: 'Invalid or expired refresh token' });
        }

        const user = await User.findById(payload.sub);
        if (!user) {
            return res.status(401).json({ error: 'Invalid refresh token' });
        }

        const stored = user.account.refreshTokens || [];
        const exists = stored.some(rt => rt.token === token);
        if (!exists) {
            return res.status(401).json({ error: 'Refresh token revoked' });
        }

        // Genera nuevos tokens
        const { accessToken, refreshToken: newRefresh } = generateTokens(user._id);
        user.account.refreshTokens = stored.filter(rt => rt.token !== token);
        user.account.refreshTokens.push({ token: newRefresh });
        await user.save();

        res
            .cookie('refreshToken', newRefresh, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
                maxAge: 1000 * 60 * 60 * 24 * 7
            })
            .json({ accessToken });

    } catch (error) {
        console.error('Refresh token error:', error);
        res.status(500).json({ error: 'Error refreshing token' });
    }
};

const logoutUser = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        if (token) {
            try {
                const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
                await User.findByIdAndUpdate(payload.sub, {
                    $pull: { 'account.refreshTokens': { token } }
                });
            } catch {
                // Token inválido, igual limpiamos la cookie
            }
        }
        res.clearCookie('refreshToken').status(200).json({ message: 'Logged out' });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ error: 'Error logging out' });
    }
};

const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-account.passwordHash -account.tokens');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ user });
    } catch (error) {
        console.error('Error in /me:', error);
        res.status(500).json({ error: 'Error retrieving user info' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    refreshToken,
    logoutUser,
    getCurrentUser
};
