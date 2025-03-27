require('dotenv').config();
const jwt = require('jsonwebtoken');

const defineAuth = (req, res, next) => {
    try {
        const token = req.cookies.jwt; 
        if (!token) {
            return res.status(401).json({ error: 'Access denied. No token provided.' });
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ error: err.message});
    }
};

module.exports = defineAuth;
