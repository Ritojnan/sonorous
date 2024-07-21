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

import { Badge } from "@/components/ui/badge";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { MdChatBubble } from "react-icons/md";

import Tiptap from "@/components/Tiptap";
import OCR from "@/components/ocr";
import Crawler from "@/components/crawler";
import ConvertPDF from "@/components/convertPDF";
import Cookies from "js-cookie";
import { useParams, useRouter } from "next/navigation";

export default function ChatBotDetail() {
  const params = useParams<{ botid: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [botdetail, setBotDetail] = useState<any>();

  useEffect(() => {
    const fetchBotDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/getchatbotdetails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          body: JSON.stringify({
            id: params?.botid,
          }),
        });
        console.log(response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Ss"+data);
        setBotDetail(data);
      } catch (err: any) {
        // router.push("/dashboard/chatbots");
      } finally {
        setLoading(false);
      }
    };

    fetchBotDetails();
  }, [params, router]);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-md p-4 hidden md:block">
          <FlowSetUp />
        </div>
        <div className="p-4 h-full">
          <Tabs defaultValue="website" className="w-full">
            <TabsList>
              <TabsTrigger value="website">Chat Layout</TabsTrigger>
              <TabsTrigger value="embed">Embed Layout</TabsTrigger>
            </TabsList>
            <TabsContent value="website">
              <iframe title="embed" src={"/embed/"+params?.botid} className="w-full" />

              {/* <ConvertPDF />
              <Crawler />
              <Tiptap />
              <OCR /> */}
            </TabsContent>
            <TabsContent value="embed">
              <div className="p-4 fixed bottom-12 right-4 rounded-full z-50 m-8">
                <MdChatBubble className="h-8 w-8 bg-blue-500" />
              </div>

              <div className="h-full bg-white dark:bg-zinc-950 rounded-md p-4">
                <div className="flex items-center justify-center">
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
                  Make changes and train your chatbot here. Click save when you're
                  done.
                </SheetDescription>
              </SheetHeader>
              <FlowSetUp />
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit">Save changes</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
}
