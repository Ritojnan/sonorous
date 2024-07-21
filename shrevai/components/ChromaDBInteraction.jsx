"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ChromaDBInteraction() {
  const [collectionName, setCollectionName] = useState("");
  const [documents, setDocuments] = useState("");
  const [ids, setIds] = useState("");
  const [queryTexts, setQueryTexts] = useState("");
  const [nResults, setNResults] = useState("5");
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleUpsert = async () => {
    try {
      const response = await fetch("/api/chromadb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          collectionName,
          documents: documents.split("\n"),
          ids: ids.split("\n"),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to add documents");
      }
    } catch (error) {
      setError("Failed to add documents");
    }
  };

  const handleQuery = async () => {
    try {
      const response = await fetch("/api/chromadb", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          collectionName,
          queryTexts: queryTexts.split("\n"),
          nResults,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setResults(data);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to fetch results");
      }
    } catch (error) {
      setError("Failed to fetch results");
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="collectionName">Collection Name</Label>
        <Input
          id="collectionName"
          value={collectionName}
          onChange={(e) => setCollectionName(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="documents">Documents (one per line)</Label>
        <Input
          id="documents"
          value={documents}
          onChange={(e) => setDocuments(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="ids">IDs (one per line)</Label>
        <Input
          id="ids"
          value={ids}
          onChange={(e) => setIds(e.target.value)}
        />
      </div>
      <Button onClick={handleUpsert}>Upsert Documents</Button>
      <div>
        <Label htmlFor="queryTexts">Query Texts (one per line)</Label>
        <Input
          id="queryTexts"
          value={queryTexts}
          onChange={(e) => setQueryTexts(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="nResults">Number of Results</Label>
        <Input
          id="nResults"
          type="number"
          value={nResults}
          onChange={(e) => setNResults(e.target.value)}
        />
      </div>
      <Button onClick={handleQuery}>Query</Button>
      {error && <div className="text-red-500">{error}</div>}
      {results && (
        <div>
          <h2>Results</h2>
          <pre>{JSON.stringify(results, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
