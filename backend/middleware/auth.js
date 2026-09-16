const jwt = require('jsonwebtoken');

// Verify JSON Web Token (JWT) on protected routes
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  // Expect format: "Bearer <token>"
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      status: 'error',
      message: 'Access denied. No authentication token provided.',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key');
    req.user = decoded; // Attaches { id, email, role } to the request object
    next();
  } catch (error) {
    return res.status(403).json({
      status: 'error',
      message: 'Invalid or expired authentication token.',
    });
  }
};

// Enforce Admin privileges
const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'ADMIN') {
    return res.status(403).json({
      status: 'error',
      message: 'Forbidden. Access restricted to administrator accounts only.',
    });
  }
  next();
};

module.exports = {
  authenticateToken,
  requireAdmin,
};