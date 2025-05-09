const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/User");

const isLocked = (user) => {
    return user.account.lockUntil && user.account.lockUntil > Date.now();
};

const registerUser = async (req, res) => {
    try {
        const { name, email, username, password } = req.body;

        const existingUsername = await User.findOne({ 'account.username': username });
        if (existingUsername) {
            return res.status(400).json({ error: "Username already exists" });
        }

        const existingEmail = await User.findOne({ 'personalInfo.email': email });
        if (existingEmail) {
            return res.status(400).json({ error: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            personalInfo: { name, email },
            account: { username, passwordHash: hashedPassword }
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        res.status(500).json({
            error: "Error registering a user",
            details: error.message,
            body: req.body
        });
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

        if (!user) return res.status(400).json({ error: "Invalid username/email or password" });

        if (isLocked(user)) {
            return res.status(403).json({ error: "Account locked. Try again later." });
        }

        const isMatch = await bcrypt.compare(password, user.account.passwordHash);
        user.account.loginAttempts += 1;

        if (!isMatch) {
            if (user.account.loginAttempts >= 5) {
                user.account.lockUntil = Date.now() + 30 * 60 * 1000; // Bloqueo por 30 minutos
            }

            await user.save();
            return res.status(400).json({ error: "Invalid username/email or password" });
        }

        user.account.loginAttempts = 0;
        user.account.lockUntil = null;
        user.account.last_login = Date.now();

        const token = jwt.sign({ userId: user._id }, "secretkey", { expiresIn: "1h" });
        user.account.tokens.push({ token });

        await user.save();
        res.json({ message: "Login successful", token });

    } catch (error) {
        res.status(500).json({ error: "Error logging in" });
    }
};


module.exports = {
    registerUser,
    loginUser,
};
