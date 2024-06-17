import { GoogleGenerativeAI } from "@google/generative-ai";
import Cors from "cors";
import prisma from "@/lib/prisma";
function convertToJson(input) {
  // Remove the backticks and "json" label from the string
  let cleanStr = input.replace(/```json\n|```/g, "");

  // Parse the cleaned string to JSON
  let jsonObj = JSON.parse(cleanStr);

  return jsonObj;
}

// Initialize the cors middleware
const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default async function handler(req, res) {
  // Run the middleware
  await runMiddleware(req, res, cors);

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { userInput } = req.body;
  if (!userInput) {
    return res.status(400).json({ message: "User input is required" });
  }

  try {
    const result = await model.generateContent(
      `Extract the contact information from the following paragraph:\n\n${userInput}\n\nProvide the information in JSON format with keys: name, email, phone, address. default value is empty string`
    );

    const response = result.response;
    const text = response.text();
    let jsonResult = convertToJson(text);
    console.log(jsonResult.name, jsonResult.email, jsonResult.phone, jsonResult.address);


    const contact = await prisma.contact.create({
      data: {
        name: jsonResult.name,
        email: jsonResult.email,
        phone: jsonResult.phone,
        address: jsonResult.address,
      },
    });
    return res.status(200).json(contact);

  } catch (error) {
    console.error("Error extracting contact information:", error);
    res.status(500).json({ error: "Failed to extract contact information" });
  }
}
