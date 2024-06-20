// pages/api/createuser.js
import prisma from '@/lib/prisma';
import { hash } from 'bcryptjs';
import {v4 as uuidv4} from 'uuid';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { companyId, username, email, password } = req.body;

  try {
    // Ensure companyId is provided
    if (!companyId) {
      return res.status(400).json({ error: 'companyId is required' });
    }

    // Hash password if provided
    let hashedPassword = null;
    if (password) {
      hashedPassword = await hash(password, 10);
    }

    const user = await prisma.user.create({
      data: {
        id: uuidv4(),
        username: username || null,
        email: email || null,
        password: hashedPassword,
        companyId: parseInt(companyId, 10),
      },
    });

    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Unable to create user' });
  }
}
