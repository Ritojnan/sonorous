// pages/api/messages.js

import prisma from '@/lib/prisma';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { content, senderId, sessionId } = req.body;

    try {
      const message = await prisma.message.create({
        data: {
          content,
          senderType:"user",
          senderId,
          session: { connect: { id: sessionId } }, // Assuming sessionId is provided in the request body
        },
      });
      console.log(".")

      const session =await prisma.chatbotSession.findUnique({
        where: { id: sessionId },
        include: { messages: true },

      })
      console.log(session.id)

//write code here

      // console.log(company)

      let text =''

      try {
        const result = await model.generateContent(content);
        const response = result.response;
         text = response.text();
      } catch (error) {
        console.error('Error generating chat response:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }

      const botmessage = await prisma.message.create({
        data: {
          content:text,
          senderType:"chatbot",
          senderId:session.chatbotId.toString(),
          session: { connect: { id: sessionId } }, // Assuming sessionId is provided in the request body
        },
      });

      res.status(201).json({message,botmessage});
    } catch (error) {
      console.error('Error creating message:', error);
      res.status(500).json({ error: 'Failed to create message' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
