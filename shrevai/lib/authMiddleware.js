// lib/authMiddleware.js
import jwt from 'jsonwebtoken';

export default function authMiddleware(handler) {
  return async (req, res) => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authorization token required' });
    }

    const token = authorization.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Attach the decoded user to the request object
      return handler(req, res); // Call the original handler
    } catch (error) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
  };
}
