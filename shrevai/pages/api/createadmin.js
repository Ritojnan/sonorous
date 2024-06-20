// pages/api/signup.js
import prisma from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, email, name, password,companyId } = req.body;

    // Hash the password
    const hashedPassword = await hash(password, 10);

    try {
      // Create a new employee
      const user = await prisma.employee.create({
        data: {
          employeeId: uuidv4(), // Generate a unique employeeId
          username, // Assuming `username` is provided in the request body
          email,
          name,
          password: hashedPassword,
          role:"admin",
          companyId: companyId ? parseInt(companyId, 10) : null, // Set companyId to null if not provided
        },
      });

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: '15d',
      });
  
      res.status(201).json({ token, user });
    } catch (error) {
      res.status(500).json({ error: 'User creation failed', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} not allowed`);
  }

}
