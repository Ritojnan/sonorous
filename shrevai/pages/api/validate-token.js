// pages/api/validate-token.js
import authMiddleware from '@/lib/authMiddleware';
import prisma from '@/lib/prisma';
const handler =async (req, res) => {
  const user = await prisma.employee.findUnique({
    where: { id: req.user.userId },
  })
  res.status(200).json({ valid: true, user });
};

export default authMiddleware(handler);
