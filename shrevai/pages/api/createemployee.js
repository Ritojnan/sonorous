// pages/api/createemployee.js
import prisma from "@/lib/prisma";
import authMiddleware from "@/lib/authMiddleware";
import { hash } from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { username, email, name, password } = req.body;
  const hashedPassword = await hash(password, 10);

  try {
    // Check if user is authenticated (middleware already checked)
    const userId = req.user.userId;

    // Find the authenticated user to check if they are an admin
    const admin = await prisma.employee.findUnique({
      where: { id: userId },
      include: { company: true }, // Include company details
    });

    if (!admin || !admin.company || admin.role !== "admin") {
      return res.status(403).json({ error: "Unauthorized to create employee" });
    }

    // Create a new employee under the admin's company
    const employee = await prisma.employee.create({
      data: {
        employeeId: uuidv4(), // Generate a unique employeeId
        username,
        email,
        name,
        password: hashedPassword,
        role: "employee",
        companyId: admin.company.id, // Assign admin's companyId to the new employee
      },
    });

    res.status(201).json(employee);
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ error: "Unable to create employee" });
  }
}

export default authMiddleware(handler);
