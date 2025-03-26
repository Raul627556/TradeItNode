const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Verifica si el usuario está bloqueado
const isLocked = (user) => {
    return user.account.lockUntil && user.account.lockUntil > Date.now();
};

// Registro de usuario
exports.registerUser = async (req, res) => {
    try {
        const { name, email, username, password } = req.body;
        
        const existingUser = await User.findOne({ 'account.username': username });
        if (existingUser) return res.status(400).json({ error: "Username already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            personalInfo: { name, email },
            account: { username, passwordHash: hashedPassword }
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        res.status(500).json({
            error: "Error registering auser",
            details: error.message,
            body: req.body + "xd"
        });
    }
};

// Login de usuario
exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ 'account.username': username });

        if (!user) return res.status(400).json({ error: "Invalid username or password" });

        if (isLocked(user)) {
            return res.status(403).json({ error: "Account locked. Try again later." });
        }

        const isMatch = await bcrypt.compare(password, user.account.passwordHash);
        if (!isMatch) {
            user.account.loginAttempts += 1;

            if (user.account.loginAttempts >= 5) {
                user.account.lockUntil = Date.now() + 30 * 60 * 1000; // Bloqueo por 30 minutos
            }

            await user.save();
            return res.status(400).json({ error: "Invalid username or password" });
        }

        // Reset de intentos fallidos y actualizar `last_login`
        user.account.loginAttempts = 0;
        user.account.lockUntil = null;
        user.account.last_login = Date.now();
        
        const token = jwt.sign({ userId: user._id }, 'secretkey', { expiresIn: '1h' });
        user.account.tokens.push({ token });

        await user.save();
        res.json({ message: "Login successful", token });

    } catch (error) {
        res.status(500).json({ error: "Error logging in" });
    }
};