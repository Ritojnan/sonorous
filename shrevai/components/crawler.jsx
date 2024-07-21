"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card"; // Adjust according to your component library
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageCircle, Globe, AlertCircle } from "lucide-react";
import { Progress } from "./ui/progress";

export default function Home() {
  const [domain, setDomain] = useState("");
  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState(0);
  const [isCrawling, setIsCrawling] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setProgress(0);
    setIsCrawling(true);

    try {
      const res = await fetch("/api/crawler", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        body: JSON.stringify({ domainname: domain }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      setMessage("An error occurred");
    } finally {
      setIsCrawling(false);
    }
  };

  useEffect(() => {
    let interval;
    if (isCrawling) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const randomIncrement = Math.floor(Math.random() * 10) + 1;
          const newProgress = Math.min(prev + randomIncrement, 100);
          if (newProgress === 100) {
            clearInterval(interval);
          }
          return newProgress;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCrawling]);

  return (
      <Card className="w-full p-2">
        <CardHeader className="flex items-center">
          <Globe className="w-6 h-6 text-gray-500 " />
          <h1 className="text-xl font-semibold">Domain Crawler</h1>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="domain"
                className="block text-sm font-medium text-gray-700"
              >
                Please enter a publicly accessible URL
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <Input
                  id="domain"
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="Enter domain name"
                  className="flex-1 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isCrawling}>
              {isCrawling ? "Crawling..." : "Crawl"}
            </Button>
          </form>
          {message && (
            <div className="mt-4 p-2 border rounded text-sm text-yellow-800 bg-yellow-100">
              <AlertCircle className="w-5 h-5 text-gray-500 inline-block mr-1" />
              {message}
            </div>
          )}
          {isCrawling && (
            <div className="mt-4">
              <Progress value={progress} />
              <p className="mt-2 text-center">{progress}%</p>
            </div>
          )}
        </CardContent>
      </Card>
  );
}
