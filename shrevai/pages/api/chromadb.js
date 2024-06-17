// pages/api/chromadb.js
import { ChromaClient } from "chromadb";

const client = new ChromaClient({
    path: "http://127.0.0.1:8000",
});

export default async function handler(req, res) {
    try {
        console.log(".");

        const collection = await client.getOrCreateCollection({
            name: req.body.collectionName ,
        });
        console.log(".");

        if (req.method === "POST") {
            const { documents, ids } = req.body;
            await collection.upsert({
                documents,
                ids,
            });
            return res.status(200).json({ message: "Documents added successfully" });
        }

        if (req.method === "GET") {
            const { queryTexts, nResults } = req.body;
            const results = await collection.query({
                queryTexts,
                nResults: parseInt(nResults),
            });
            return res.status(200).json(results);
        }

        return res.status(405).json({ message: "Method not allowed" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
