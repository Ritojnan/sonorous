import prisma from "@/lib/prisma";
import authMiddleware from "@/lib/authMiddleware";

async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { chatbotName, initmessage, initcta, tags, type } = req.body;
  const userId = req.user.userId;

  try {
    const employee = await prisma.employee.findUnique({
      where: { id: userId },
      include: { company: true },
    });

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    const chatbot = await prisma.chatbot.create({
      data: {
        chatbotName,
        initmessage,
        initcta: JSON.stringify(initcta),
        tags,
        type,
        companyId: employee.company.id,
        owners: { connect: { id: userId } },
      },
    });

    console.log("Chatbot created:", chatbot);

    res.status(201).json({ ...chatbot, initcta });
  } catch (error) {
    console.error("Error creating chatbot:", error);
    res.status(500).json({ error: "Unable to create chatbot" });
  }
}

export default authMiddleware(handler);
