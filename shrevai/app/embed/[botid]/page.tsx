"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import {
  useParams,
  useRouter,
  usePathname,
  useSearchParams,
} from "next/navigation";
import Cookies from "js-cookie";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Loader,
  Menu,
  MicIcon,
  MoveHorizontalIcon,
  PaperclipIcon,
  PlusIcon,
  SendIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { TbMicrophone } from "react-icons/tb";
import { ModeToggle } from "@/components/Navbar";

interface ChatbotDetails {
  id: number;
  chatbotName: string;
  companyId: number;
  initmessage: string;
  initcta: string;
  type: string;
  tags?: string;
  data?: any;
  company: { id: number; name: string };
  owners: { id: number; name: string }[];
  sessions: any[];
  modifiedAt: string;
  createdAt: string;
  isActive: boolean;
}

export default function Component() {
  const { botid } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [botDetail, setBotDetail] = useState<ChatbotDetails | null>(null);
  const [screenIsLarge, setScreenIsLarge] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [inputValue, setInputValue] = useState("");
  const [sessions, setSessions] = useState<any[]>([]);
  const [messages, setmessages] = useState<any[]>([]);
  const messagesEndRef = useRef(null);
  const [isListening, setIsListening] = useState(false);

  const [currentSession, setCurrentSession] = useState<any>(
    searchParams?.toString().split("=")[1]
  );
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  async function getAllMessages() {
    try {
      let response = await fetch("http://localhost:3000/api/read/message", {
        method: "POST",
        body: JSON.stringify({
          sessionId: searchParams?.toString().split("=")[1],
        }),
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
      });

      let data = await response.json();
      console.log(data);
      setmessages(data.messages || []);
    } catch (error) {
      console.log(error);
      setmessages([]);
    }
  }

  useEffect(() => {
    setCurrentSession(
      searchParams?.toString().split("=")[1]
        ? searchParams?.toString().split("=")[1]
        : ""
    );
    localStorage.setItem(
      "currentSession",
      searchParams?.toString().split("=")[1] || ""
    );
    try {
      getAllMessages();
    } catch (error) {
      console.log(error);
      setmessages([]);
    }
  }, [searchParams]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams?.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    console.log(currentSession);
    console.log(messages);
  }, [currentSession]);

  const createsession = async () => {
    try {
      const response = await fetch("/api/createsession", {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatbotId: botid,
          userId: localStorage.getItem("userId"),
        }),
      });

      if (!response.ok) {
        setmessages([]);
        throw new Error("Failed to create user");
      }

      const sessionData = await response.json();
      console.log("Session created:", sessionData.sessionId);
      router.push(`/embed/${botid}?session=${sessionData.sessionId}`);

      setSessions([...sessions, sessionData.sessionId]);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const fetchChatbotDetails = async (
    botid: string
  ): Promise<ChatbotDetails | null> => {
    try {
      const response = await fetch("/api/getchatbotdetails", {
        method: "POST",
        headers: {
          Accept: "*/*",
          Authorization: "Bearer " + Cookies.get("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: botid }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch chatbot details");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching chatbot details:", error);
      return null;
    }
  };

  const getAllSessions = async () => {
    try {
      let response = await fetch("/api/getsession", {
        method: "POST",
        body: JSON.stringify({
          chatbotId: botid,
          userId: localStorage.getItem("userId"),
        }),
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      const sessionData = await response.json();
      setSessions(sessionData);
      console.log(sessionData);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchChatbotDetails(botid);

      if (data) {
        setBotDetail(data);
      } else {
        setBotDetail(null);
      }

      setLoading(false);
    };

    fetchData();
  }, [botid]);

  useEffect(() => {
    const createUserIfNeeded = async () => {
      try {
        const userId = localStorage.getItem("userId");

        if (!userId) {
          const response = await fetch("/api/createuser", {
            method: "POST",
            headers: {
              Accept: "*/*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ companyId: botDetail?.companyId }),
          });

          if (!response.ok) {
            throw new Error("Failed to create user");
          }

          const userData = await response.json();
          console.log("Created user with ID:", userData.id);
          localStorage.setItem("userId", userData.id);
        }
      } catch (error) {
        console.error("Error creating user:", error);
      }
    };

    createUserIfNeeded();
    console.log(botDetail);
    setmessages([
      {
        content: botDetail?.initmessage,
        senderType: "chatbot",
        createdAt: new Date(),
      },
    ]);
    getAllSessions();

    const handleResize = () => {
      setScreenIsLarge(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [botDetail]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-zinc-100 dark:bg-zinc-950">
        <div className="flex flex-col items-center">
          <Loader className="h-10 w-10 animate-spin" />
          <div className="mt-4 text-zinc-500 dark:text-zinc-400">
            Loading...
          </div>
        </div>
      </div>
    );
  }

  function newChat() {
    router.push(`/embed/${botid}`);
    setmessages([]);
    setInputValue("");
    getAllSessions();
    createsession();
    console.log(messages);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inputValue.trim() == "") return;
    if (!currentSession) {
      await createsession();
    }
    setInputValue("");

    console.log(inputValue);
    console.log(messages);
    setmessages([
      ...(messages || []),
      { content: inputValue, senderType: "user", createdAt: new Date() },
      { content: "thinking...", senderType: "chatbot", createdAt: new Date() },
    ]);

    const response = await fetch("/api/usermessage", {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionId: currentSession,
        senderId: localStorage.getItem("userId"),
        content: inputValue,
        chatbotName: botDetail?.chatbotName,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      setmessages([
        ...(messages || []),
        { content: inputValue, senderType: "user" },
        { content: "Error", senderType: "chatbot" },
      ]);
      return;
    }

    setmessages([...(messages || []), data.message, data.botmessage]);
    scrollToBottom();
  }

  if (!botDetail) {
    return (
      <div className="flex flex-col h-screen w-full items-center justify-center bg-zinc-100 dark:bg-zinc-950">
        <div className="text-2xl text-zinc-500 dark:text-zinc-400">
          Bot details not found.
        </div>
      </div>
    );
  }

  const handleVoiceInput = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const voiceInput = event.results[0][0].transcript;
      setInputValue(voiceInput);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className="flex h-screen w-full">
      {screenIsLarge ? (
        <div className="h-full w-1/3 bg-zinc-50 p-4 dark:bg-zinc-900">
          <div className="flex items-center justify-between pb-4">
            <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Chat Sessions
            </h1>
            <ModeToggle />
            <Button
              className="flex items-center gap-2"
              variant="default"
              onClick={newChat}
            >
              <PlusIcon size={18} />
              New Chat
            </Button>
          </div>
          <div className="flex flex-col gap-2 overflow-y-auto h-[calc(100vh-120px)]">
            {sessions.map((session, index) => (
              <Button
                key={index}
                className="w-full justify-start"
                variant="ghost"
                onClick={() =>
                  router.push(`/embed/${botid}?session=${session.sessionId}`)
                }
              >
                {session?.name
                  ? session?.name
                  : "Session " + session?.sessionId?.substring(0, 8) + "..."}
              </Button>
            ))}
          </div>
        </div>
      ) : (
        <Sheet>
          <SheetTrigger asChild>
            <Button className="fixed top-4 right-4 z-10">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Chat Sessions</SheetTitle>
            </SheetHeader>
            <SheetFooter>
              <Button
                className="w-full justify-start"
                variant="ghost"
                onClick={newChat}
              >
                <PlusIcon size={18} />
                New Chat
              </Button>
            </SheetFooter>
            <div className="flex flex-col gap-2 overflow-y-auto h-[calc(100vh-120px)] overflow-x-hidden">
              {sessions.map((session, index) => (
                <Button
                  key={index}
                  className="w-full justify-start"
                  variant="ghost"
                  onClick={() =>
                    router.push(`/embed/${botid}?session=${session.sessionId}`)
                  }
                >
                  {session?.name
                    ? session?.name
                    : "Session " + session?.sessionId?.substring(0, 8) + "..."}
                </Button>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      )}
      <div className="flex flex-col h-full w-full p-4">
        <div className="flex items-center justify-between pb-4">
          <div className="flex items-center gap-2">
            <Avatar>
              {/* <AvatarImage
                src="https://via.placeholder.com/150"
                alt={botDetail.chatbotName}
              /> */}
              <AvatarFallback>{botDetail.chatbotName.charAt(0)}</AvatarFallback>
            </Avatar>
            <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              {botDetail.chatbotName}
            </h1>
          </div>
        </div>
        <div className="flex-grow overflow-auto bg-zinc-100 p-4 dark:bg-zinc-950">
          {messages?.map((message, index) => (
            <div
              key={index}
              className={`flex w-full my-1 ${
                message.senderType === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs my-1 rounded-3xl p-4 ${
                  message.senderType === "user"
                    ? "bg-sky-500 text-white rounded-br-none"
                    : message.senderType === "chatbot"
                    ? "bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 rounded-bl-none"
                    : "bg-rose-200 text-rose-800 dark:bg-rose-800 dark:text-rose-200 rounded-bl-none"
                }`}
              >
                {message.content}
                <p
                  className={`text-xs ${
                    message.senderType === "user"
                      ? "text-right text-sky-200"
                      : "text-left text-zinc-500"
                  } `}
                >
                  {new Date(message.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form
          onSubmit={onSubmit}
          className="flex items-center justify-between bg-white p-4 dark:bg-zinc-800"
        >
          <Input
            className="flex-grow mr-2"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button
            type="button"
            variant="default"
            onClick={handleVoiceInput}
            className="rounded-full mx-1"
          >
            <MicIcon className={`${isListening ? "animate-pulse" : ""}`} />
          </Button>
          <Button type="submit" variant="default" className="rounded-full mx-1">
            <SendIcon />
          </Button>
        </form>
      </div>
    </div>
  );
}
