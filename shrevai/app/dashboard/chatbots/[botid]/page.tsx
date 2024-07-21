"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FlowSetUp from "@/components/flow-set-up";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, RefreshCcw } from "lucide-react";
import { MdChatBubble } from "react-icons/md";
import Cookies from "js-cookie";
import { useParams, useRouter } from "next/navigation";

export default function ChatBotDetail() {
  const params = useParams<{ botid: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [botdetail, setBotDetail] = useState<any>();
  const [error, setError] = useState(null);
  const [key, setKey] = useState(0); // State to manage the key for refreshing
  const refreshIframe = () => {
    setKey((prevKey) => prevKey + 1); // Update the key to force refresh
  };

  useEffect(() => {
    async function fetchData() {
      try {
        let headersList = {
          Accept: "*/*",
          Authorization: "Bearer " + Cookies.get("token"),
          "Content-Type": "application/json",
        };

        let response = await fetch(
          "/api/getchatbotdetails",
          {
            method: "POST",
            headers: headersList,
            body: JSON.stringify({ id: params?.botid }),
          }
        );

        let data = await response.json();
        console.log(data);
        setBotDetail(data);
        setLoading(false);

        if (!response.ok) {
          router.push("/dashboard/chatbots");
        }
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    fetchData();
  }, [params?.botid]);

  if (loading)
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 h-[calc(100vh-128px)]">
        <div className="rounded-md p-4 hidden md:block h-full bg-zinc-300 dark:bg-zinc-600 animate-pulse  "></div>
        <div className=" rounded-md p-4 h-full bg-zinc-300 dark:bg-zinc-600 animate-pulse   "></div>
      </div>
    );

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 h-[calc(100vh-128px)]">
      <div className="rounded-md p-4 hidden md:block h-full">
        <FlowSetUp botdetail={botdetail} />
      </div>
      <div className="p-4 h-full">
        <Tabs defaultValue="website" className="h-full w-full">
          <TabsList>
            <TabsTrigger value="website">Chat Layout</TabsTrigger>
            <TabsTrigger value="embed">Embed Layout</TabsTrigger>
          </TabsList>
          <Button onClick={refreshIframe} variant={"link"}>
            <RefreshCcw className="w-4 h-4 mr-2" /> Refresh
          </Button>
          <TabsContent value="website" className="h-[calc(80vh)] overflow-y-scroll scroll-auto py-2 my-2">
            <iframe
              key={key} // Key attribute to force re-mounting of iframe
              title="embed"
              src={"/embed/" + params?.botid}
              className="w-full h-full rounded-md"
            />
          </TabsContent>
          <TabsContent value="embed" className="h-[calc(80vh)] overflow-y-scroll scroll-auto py-2 my-2">
            <div className="p-4 fixed bottom-12 right-4 rounded-full z-50 m-8">
              <MdChatBubble className="h-8 w-8 bg-blue-500" />
            </div>

            <div className="h-full bg-white dark:bg-zinc-950 rounded-md p-4">
              <div className="flex items-center justify-center h-full">
                <div className="space-y-4 w-11/12 max-w-2xl mx-auto">
                  <div className="animate-pulse">
                    <div className="h-6 bg-gray-300 dark:bg-zinc-700 rounded w-1/3 mb-4"></div>
                    <div className="h-48 bg-gray-300 dark:bg-zinc-700 rounded"></div>
                  </div>
                  <div className="animate-pulse">
                    <div className="h-6 bg-gray-300 dark:bg-zinc-700 rounded w-2/4 mb-4"></div>
                    <div className="h-48 bg-gray-300 dark:bg-zinc-700 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <div className="p-4 md:hidden fixed bottom-0 w-full">
        <Sheet>
          <SheetTrigger asChild>
            <Button className="w-full">
              <ArrowUp className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom">
            <SheetHeader>
              <SheetTitle>Chatbot {params?.botid}</SheetTitle>
              <SheetDescription>
                Make changes and train your chatbot here. Click save when
                you&apos;re done.
              </SheetDescription>
            </SheetHeader>
            <FlowSetUp botdetail={botdetail} />
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit" className="w-full">
                  <ArrowDown className="h-4 w-4" />
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
