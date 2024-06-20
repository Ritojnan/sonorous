// pages/api/createcompany.js
import prisma from '@/lib/prisma';
import authMiddleware from '@/lib/authMiddleware';

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name } = req.body;

  try {
    // Check if user is authenticated (middleware already checked)
    const userId = req.user.userId;

    // Check if the user already belongs to a company
    const existingEmployee = await prisma.employee.findFirst({
      where: {
        AND: [
          { id: userId },
          { companyId: { not: null } }, // Check if companyId is not null (user already belongs to a company)
          {role: "admin"}
        ]
      }
    });
    if (existingEmployee) {
      return res.status(400).json({ error: 'User already belongs to a company' });
    }

    // Create a new company
    const company = await prisma.company.create({
      data: {
        name,
        employees: { connect: { id: userId } }, // Connect the creator as an employee
      },
    });

    res.status(201).json(company);
  } catch (error) {
    console.error('Error creating company:', error);
    res.status(500).json({ error: 'Unable to create company' });
  }
}

export default authMiddleware(handler);
