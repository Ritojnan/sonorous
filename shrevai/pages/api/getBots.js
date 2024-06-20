// pages/api/getBots.js
import prisma from "@/lib/prisma";
import authMiddleware from "@/lib/authMiddleware";

async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const userId = req.user.userId;

  try {
    // Fetch all chatbots where the user is an owner
    const chatbots = await prisma.chatbot.findMany({
      where: {
        owners: {
          some: {
            id: userId,
          },
        },
      },
    });

    res.status(200).json(chatbots);
  } catch (error) {
    console.error("Error fetching chatbots:", error);
    res.status(500).json({ error: "Unable to fetch chatbots" });
  }
}

export default authMiddleware(handler);
