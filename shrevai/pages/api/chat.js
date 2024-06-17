import { GoogleGenerativeAI } from '@google/generative-ai';
import Cors from 'cors';

// Initialize the cors middleware
const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
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
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export default async function handler(req, res) {
  // Run the middleware
  await runMiddleware(req, res, cors);

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { userInput } = req.body;
  if (!userInput) {
    return res.status(400).json({ message: 'User input is required' });
  }

  try {
    const result = await model.generateContent(userInput);
    const response = result.response;
    const text = response.text();
    res.status(200).json({ message: text });
  } catch (error) {
    console.error('Error generating chat response:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
