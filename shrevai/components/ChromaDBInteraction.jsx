"use client";

import React, { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Loader, Upload } from "lucide-react";
import { toast } from "./ui/use-toast";

export default function ChromaDBInteraction() {
  const [documents, setDocuments] = useState("");
  const [queryTexts, setQueryTexts] = useState("");
  const [nResults, setNResults] = useState("5");
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Enter your documents here...",
      }),
    ],
    content: '',
    onUpdate: ({ editor }) => {
      setDocuments(editor.getHTML());
    },
  });

  const handleUpsert = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/train", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${Cookies.get("token")}`,
        },
        body: JSON.stringify({
          documents: documents.split("\n"),
        }),
      });

      if (response.ok) {
        const data = await response.json();


        toast({
          title: "Success",
          description: " Documents added successfully",
          
        })
    


      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to add documents");
      }
    } catch (error) {
      setError("Failed to add documents");
    }
    setLoading(false);
  };

  const handleQuery = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `/api/train?&queryTexts=${encodeURIComponent(
          queryTexts.split("\n").join(",")
        )}&nResults=${nResults}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Cookies.get("token")}`,
          },
        }
      );

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
    setLoading(false);
  };

  return (
    <Card className="space-y-4 my-2 p-4">
      <div>
        <Label htmlFor="documents">Add Information [Markdown]</Label>
        <div className="border p-2 rounded-md">
          <EditorContent editor={editor}   />
        </div>
      </div>
      <Button onClick={handleUpsert} className="w-full" disabled={loading}>
        {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
      </Button>
      <div>
        <Label htmlFor="queryTexts">Ask Questions</Label>
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
      <Button className="w-full" onClick={handleQuery} disabled={loading}>
        {loading ? "Loading..." : "Query"}
      </Button>
      {error && <div className="text-red-500">{error}</div>}
      {results && (
        <div>
          <h2 className="text-2xl font-bold mt-6 mb-2">Results</h2>
          <div className="overflow-x-auto">
  <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-zinc-200 dark:bg-zinc-800">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documents</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Id</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Distances</th>
      </tr>
    </thead>
    <tbody className=" divide-y divide-gray-200">
      {results?.ids[0]?.map((ide, i) => (
        <tr key={i}>
          <td className="px-6 py-4 whitespace-nowrap">{results.documents[0][i]}</td>
          <td className="px-6 py-4 whitespace-nowrap">{ide}</td>
          <td className="px-6 py-4 whitespace-nowrap">{results.distances[0][i]}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

           
        </div>
      )}
    </Card>
  );
}
