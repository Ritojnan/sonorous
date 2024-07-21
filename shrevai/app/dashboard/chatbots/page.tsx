"use client";

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/SNLCDRWFC4X
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  BarChart2,
  BellIcon,
  LucideSettings2,
  PlusIcon,
  Settings,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ChooseBot from "@/components/choosebot";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Badge } from "@/components/ui/badge";
export default function Component() {
  const [bots, setBots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBots = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/getBots", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setBots(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBots();
  }, []);

  return (
    <main>
      <section className="bg-white dark:bg-black p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
            Chatbots
          </h2>

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
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {loading ? (
            <>
              {[...Array(8)].map((_, i) => (
                <Card
                  key={i}
                  className="bg-gray-50 dark:bg-zinc-950 hover:bg-gray-100 dark:hover:bg-zinc-900 transition-colors animate-pulse"
                >
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <div className="w-10 h-10 bg-gray-200 dark:bg-zinc-800 rounded-full"></div>
                      </Avatar>
                      <div>
                        <div className="h-4 bg-gray-200 dark:bg-zinc-800 w-24 mb-2 rounded"></div>
                        <div className="h-3 bg-gray-200 dark:bg-zinc-800 w-36 rounded"></div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 bg-gray-200 dark:bg-zinc-800 w-28 mb-2 rounded"></div>
                    <div className="h-4 bg-gray-200 dark:bg-zinc-800 w-20 mb-2 rounded"></div>
                    <div className="h-20 bg-gray-200 dark:bg-zinc-800 rounded"></div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
                      <div className="h-9 bg-gray-200 dark:bg-zinc-800 rounded"></div>
                      <div className="h-9 bg-gray-200 dark:bg-zinc-800 rounded"></div>
                      <div className="h-9 bg-gray-200 dark:bg-zinc-800 rounded"></div>
                      <div className="h-9 bg-gray-200 dark:bg-zinc-800 rounded"></div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="h-6 bg-gray-200 dark:bg-zinc-800 w-12 rounded"></div>
                  </CardFooter>
                </Card>
              ))}
            </>
          ) : (
            <>
              {bots.map((bot: any, i) => (
                <Card
                  key={i}
                  className="h-full bg-gray-50 dark:bg-zinc-950 hover:bg-gray-100 dark:hover:bg-zinc-900 transition-colors"
                >
                  <Link href={`/dashboard/chatbots/${bot.id}`}>
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Avatar>
                          <AvatarFallback>
                            {bot.chatbotName[0] + bot.chatbotName[1] + bot.id}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                            {bot.chatbotName}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Last updated{" "}
                            {bot?.modifiedAt
                              ?.split("T")[0]
                              .split("-")
                              .reverse()
                              .join("-")}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-800 dark:text-gray-200">
                        Type:{bot?.type}
                      </p>
                      <p className="text-gray-800 dark:text-gray-200">Tags:</p>
                      <p className="text-gray-800 dark:text-gray-200">
                        {/* {bot?.tags?.split(",")?.map((tag: string) => (
                      tag
                      ))} */}
                        {JSON.parse(bot?.tags).map((tag) => {
                          return <Badge className="mr-1">{tag.label}</Badge>;
                        })}
                        {bot?.tags?.split(",")?.length == 0 && "None"}
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
                        <Button variant={"outline"}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Link
                                href={`chatbots/${bot.id}/settings`}
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                              >
                                <Settings className="h-5 w-5" />
                                <span className="sr-only">Settings</span>
                              </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                              Settings
                            </TooltipContent>
                          </Tooltip>
                        </Button>
                        <Button variant={"outline"}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Link
                                href={`chatbots/${bot.id}/notifications`}
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                              >
                                <BellIcon className="h-5 w-5" />
                                <span className="sr-only">Notifications</span>
                              </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                              Notifications
                            </TooltipContent>
                          </Tooltip>
                        </Button>
                        <Button variant={"outline"}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Link
                                href={`chatbots/${bot.id}/train`}
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                              >
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
                              <Link
                                href={`chatbots/${bot.id}/analytics`}
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                              >
                                <BarChart2 className="h-5 w-5" />
                                <span className="sr-only">Analytics</span>
                              </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                              Analytics
                            </TooltipContent>
                          </Tooltip>
                        </Button>
                      </div>
                    </CardContent>
                  </Link>
                  <CardFooter>
                    <div className="flex justify-items-stretch space-x-2">
                      <Switch id="status" />
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </>
          )}
        </section>
      </section>
    </main>
  );
}
