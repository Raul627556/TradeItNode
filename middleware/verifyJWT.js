const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Verify JWT access token in Authorization header
 */
function verifyJWT(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Invalid or expired token' });
        req.userId = decoded.sub;
        next();
    });
}

module.exports = { verifyJWT };