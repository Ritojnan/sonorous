// lib/middleware.js
import { getSession } from 'next-auth/client';

export const requireAuth = (handler) => {
  return async (req, res) => {
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    return handler(req, res);
  };
};
