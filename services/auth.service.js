const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Generate JWT access and refresh tokens
 * @param {string} userId
 */
function generateTokens(userId) {
    const accessToken = jwt.sign(
        { sub: userId },
        process.env.JWT_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
    );

    const refreshToken = jwt.sign(
        { sub: userId },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN }
    );

    return { accessToken, refreshToken };
}

module.exports = { generateTokens };