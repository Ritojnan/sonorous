"use client";

import React from "react";
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
import Tiptap from "@/components/Tiptap";
import OCR from "@/components/ocr";
import Crawler from "@/components/crawler";
import ConvertPDF from "@/components/convertPDF";
export default function Dashboard() {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="bg-grey-400 rounded-md p-4  hidden md:block">
          <FlowSetUp />
        </div>
        <div className="bg-grey-300 p-4">
          <Tabs defaultValue="account" className="w-full">
            <TabsList>
              <TabsTrigger value="account">Website Bot</TabsTrigger>
              <TabsTrigger value="password">Landing Page Bot</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <div className="h-full bg-white rounded-md"><OCR/></div>
            </TabsContent>
            <TabsContent value="password">
              Change your password here
              <ConvertPDF/>

              Question do not give skip option
              basic media advanced

              enter error message here
              <Crawler/>
              <Tiptap/>
            </TabsContent>
          </Tabs>
        </div>
        <div className=" p-4 md:hidden fixed bottom-0 w-full">
            <Sheet key={"bottom"}>
              <SheetTrigger asChild>
                <Button className="w-full">
                  <ArrowUp className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side={"bottom"}>
                <SheetHeader>
                  <SheetTitle>Edit profile</SheetTitle>
                  <SheetDescription>
                    Make changes to your profile here. Click save when you&apos;re
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
