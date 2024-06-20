// pages/api/createsession.js
import prisma from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { chatbotId, userId, type } = req.body;

  try {
    // Check if the chatbot exists
    const chatbot = await prisma.chatbot.findUnique({
      where: { id: parseInt(chatbotId, 10) },
    });

    if (!chatbot) {
      return res.status(404).json({ error: 'Chatbot not found' });
    }

    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { id: userId }, // Assuming userId is a string based on the schema
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create a new session
    const session = await prisma.chatbotSession.create({
      data: {
        chatbotId: parseInt(chatbotId, 10),
        sessionId: uuidv4(), // Generate a new UUID for sessionId
        userId: user.id, // Assuming userId is a string based on the schema
        liveAgent: false,
        type: type || 'customer support',
      },
    });

    res.status(201).json(session);
  } catch (error) {
    console.error('Error creating session:', error);
    res.status(500).json({ error: 'Unable to create session' });
  }
}
