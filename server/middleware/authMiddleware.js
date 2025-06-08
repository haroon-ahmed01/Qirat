const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const JWT_SECRET = process.env.JWT_SECRET || crypto.randomBytes(32).toString("hex");

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]; // Get token from request headers
  
  if (!token) {
    return res.status(403).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], JWT_SECRET); // Verify token
    req.user = decoded; // Attach decoded user info to request
    next(); // Proceed to next middleware or route handler
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = { verifyToken, JWT_SECRET };