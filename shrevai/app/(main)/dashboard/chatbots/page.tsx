"use client";

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/SNLCDRWFC4X
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BarChart2, BellIcon, LucideSettings2, PlusIcon, Settings } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import NameOfBot from "@/components/nameofbot";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import ChooseBot from "@/components/choosebot";

export default function Component() {
  return (
    <main>
      <section className="bg-white dark:bg-gray-800 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Chatbots</h2>

          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <PlusIcon className="h-4 w-4 mr-2" />
                Create Chatbot
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>What type of bot you want to create?</DialogTitle>
                <DialogDescription>
                  <hr className="my-2" />
                  <ChooseBot />
                  {/* <div className="grid grid-cols-1 gap-2 my-2 py-2">
                    <Link href="/dashboard/chatbots/new/customer-support">
                      <Button className="w-full">Customer Support</Button>
                    </Link>
                    <Link href="/dashboard/chatbots/new/lead-generation">
                      <Button className="w-full">Lead Generation</Button>
                    </Link>
                    <Link href="/dashboard/chatbots/new/data-collection">
                      <Button className="w-full">Data Collection</Button>
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 my-2 py-2">
                    <Button className="h-full w-full p-6">Pick from template</Button>
                    <Button className="h-full w-full p-6">Create your own bot</Button>
                  </div>
                  <NameOfBot /> */}
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Avatar>
                    {/* <img src="/placeholder.svg" alt={`Chatbot ${i + 1}`} /> */}
                    <AvatarFallback>CB{i + 1}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Chatbot {i + 1}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Last updated 2 days ago</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-800 dark:text-gray-200">
                  Type: {i % 2 === 0 ? "Customer Support" : "Lead Generation"}
                </p>
                <p className="text-gray-800 dark:text-gray-200">Tags:</p>
                <p className="text-gray-800 dark:text-gray-200">Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium delectus maiores autem placeat assumenda a voluptate quis, repudiandae natus ad!</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
                  <Button variant={"outline"}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href="#" className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
                        <Settings className="h-5 w-5" />
                        <span className="sr-only">Settings</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Settings</TooltipContent>
                  </Tooltip>
                  </Button>
                  <Button variant={"outline"}>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href="#" className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
                        <BellIcon className="h-5 w-5" />
                        <span className="sr-only">Notifications</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Notifications</TooltipContent>
                  </Tooltip>
                  </Button>
                  <Button variant={"outline"}>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href="#" className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
                        <LucideSettings2 className="h-5 w-5" />
                        <span className="sr-only">Set Up</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Set Up</TooltipContent>
                  </Tooltip>
                  </Button>
                  <Button variant={"outline"}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href="#" className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
                        <BarChart2 className="h-5 w-5" />
                        <span className="sr-only">Analytics</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Analytics</TooltipContent>
                  </Tooltip>
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex justify-items-stretch space-x-2">
                  <Switch id="status" />
                </div>
              </CardFooter>
            </Card>
          ))}
        </section>
      </section>
    </main>
  );
}
