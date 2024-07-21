// pages/api/messages.js

import prisma from "@/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ChromaClient } from "chromadb";
const client = new ChromaClient({
  path: "http://127.0.0.1:8000",
});
function convertToJson(input) {
  // Remove the backticks, "json" label, and problematic characters from the string
  let cleanStr = input.replace(/```json\n|```/g, "").replace(/[^\x20-\x7E]/g, "");

  // Parse the cleaned string to JSON
  try {
    let jsonObj = JSON.parse(cleanStr);
    return jsonObj;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null;
  }
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { content, senderId, sessionId ,chatbotName} = req.body;

    try {
      const message = await prisma.message.create({
        data: {
          content,
          senderType: "user",
          senderId,
          session: { connect: { sessionId: sessionId } }, // Assuming sessionId is provided in the request body
        },
      });

      const session = await prisma.chatbotSession.findUnique({
        where: { sessionId: sessionId },
        include: { messages: true, chatbot: true },
      });

      const company = await prisma.company.findUnique({
        where: { id: session.chatbot.companyId },
      });

      const collectionName = `company_${company.companyId}`;
      const collection = await client.getOrCreateCollection({
        name: collectionName,
      });
      const results = await collection.query({
        queryTexts: [content],
        nResults: 5,
      });

      const user = await prisma.user.findUnique({
        where: { id: senderId },
      });
      console.log(user);
      let text = "";

      try {
        const result = await model.generateContent(`You are a Financial Chatbot made by ${company.name} Your name is ${chatbotName} .You are asked this question:  ` + content+"You are provided with the context:"+JSON.stringify(results, null, 2)+"about a user whose details are "+JSON.stringify(user, null, 2)+"Try to answer from the context.You are allowed to give investment advice .Avoid answering questions out of context of financial sector customer servive.Do not talk about using context and remember you are talking on behalf of the company.However, if asked with any greeting or apprciation,answer it as normal greeting or appreciation as well respectively.If asked about yourself or your company,answer it likewise.If shared any information about themselves answer them that you have noted it correctly.Try to get information regarding their name , country , email id , phone number , address to help them if necessary.  ");
        const response = result.response;
        text = response.text();
      } catch (error) {
        console.error("Error generating chat response:", error);
        res.status(500).json({ message: "Internal Server Error" });
         return;
      }

      const botmessage = await prisma.message.create({
        data: {
          content: text,
          senderType: "chatbot",
          senderId: session.chatbotId.toString(),
          session: { connect: { sessionId: sessionId } }, // Assuming sessionId is provided in the request body
        },
      });

      res.status(201).json({ message, botmessage });

      // New code for extracting and updating user contact information
      try {
        const result = await model.generateContent(
          `Extract the contact information from the following paragraph:\n\n${content}\n\nProvide the information in JSON format with keys(datatype is string): username,firstname,lastname,metadata(any kind of extra information),country,socials,password,phoneno, email,  address. default value is null`
        );

        const response = result.response;
        const text = response.text();
        let jsonResult = convertToJson(text);
        console.log(response);
        
        if (!jsonResult) {
          res.status(500).json({ error: "Failed to extract contact information" });
          return;
        }

     

        const updatedData = {};
        if (!user.username && jsonResult.username) updatedData.username = jsonResult.username;
        if (!user.firstname && jsonResult.firstname) updatedData.firstname = jsonResult.firstname;
        if (!user.lastname && jsonResult.lastname) updatedData.lastname = jsonResult.lastname;
        if ( jsonResult.metadata) updatedData.metadata = user.metadata ? user.metadata + " " + jsonResult.metadata : jsonResult.metadata;
        if (!user.country && jsonResult.country) updatedData.country = jsonResult.country;
        if (!user.socials && jsonResult.socials) updatedData.socials = jsonResult.socials;
        if (!user.password && jsonResult.password) updatedData.password = jsonResult.password;
        if (!user.phoneno && jsonResult.phoneno) updatedData.phoneno = jsonResult.phoneno;
        if (!user.email && jsonResult.email) updatedData.email = jsonResult.email;
        if (!user.address && jsonResult.address) updatedData.address = jsonResult.address;

        const contact = await prisma.user.update({
          where: { id: senderId },
          data: updatedData,
        });
        console.log("User contact information updated:", contact);
      } catch (error) {
        console.error("Error extracting contact information:", error);
        res.status(500).json({ error: "Failed to extract contact information" });
        return;
      }

    } catch (error) {
      console.error("Error creating message:", error);
      res.status(500).json({ error: "Failed to create message" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
