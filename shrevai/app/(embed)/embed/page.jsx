/**
 * v0 by Vercel.
 * @see https://v0.dev/t/gLnKwehSh92
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"

export default function Component() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  return (
    <div className="flex h-screen w-full flex-col">
      <div className="flex flex-1">
        <div
          className={`flex flex-col border-r bg-gray-100 dark:bg-gray-950 dark:border-gray-800 transition-all duration-300 ${
            isSidebarCollapsed ? "w-14" : "w-64"
          }`}
        >
          <div className="flex h-14 items-center justify-between border-b px-4 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 border">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div
                className={`font-medium transition-all duration-300 ${
                  isSidebarCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
                }`}
              >
                You
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <MoveHorizontalIcon className="h-4 w-4" />
            </Button>
          </div>
          <div className={`flex-1 overflow-auto transition-all duration-300 ${isSidebarCollapsed ? "px-2" : "px-4"}`}>
            <div className="grid gap-2">
              <div
                className={`text-sm font-medium text-gray-500 dark:text-gray-400 transition-all duration-300 ${
                  isSidebarCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
                }`}
              >
                Conversations
              </div>
              <Link
                href="#"
                className="flex items-center gap-2 rounded-md bg-gray-200 p-2 transition-colors hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700"
                prefetch={false}
              >
                <Avatar className="h-8 w-8 border">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div
                  className={`flex-1 transition-all duration-300 ${
                    isSidebarCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
                  }`}
                >
                  <div className="font-medium">You</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Hello, how are you?</div>
                </div>
                <div
                  className={`text-sm text-gray-500 dark:text-gray-400 transition-all duration-300 ${
                    isSidebarCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
                  }`}
                >
                  2:30 PM
                </div>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 rounded-md bg-gray-200 p-2 transition-colors hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700"
                prefetch={false}
              >
                <Avatar className="h-8 w-8 border">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div
                  className={`flex-1 transition-all duration-300 ${
                    isSidebarCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
                  }`}
                >
                  <div className="font-medium">Jane Smith</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Did you get the file I sent?</div>
                </div>
                <div
                  className={`text-sm text-gray-500 dark:text-gray-400 transition-all duration-300 ${
                    isSidebarCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
                  }`}
                >
                  1:45 PM
                </div>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 rounded-md bg-gray-200 p-2 transition-colors hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700"
                prefetch={false}
              >
                <Avatar className="h-8 w-8 border">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div
                  className={`flex-1 transition-all duration-300 ${
                    isSidebarCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
                  }`}
                >
                  <div className="font-medium">Alex Johnson</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Let's discuss the project details.</div>
                </div>
                <div
                  className={`text-sm text-gray-500 dark:text-gray-400 transition-all duration-300 ${
                    isSidebarCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
                  }`}
                >
                  11:30 AM
                </div>
              </Link>
            </div>
          </div>
          <div
            className={`border-t p-4 dark:border-gray-800 transition-all duration-300 ${
              isSidebarCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
            }`}
          >
            <Button variant="outline" className="w-full">
              <PlusIcon className="h-4 w-4 mr-2" />
              <span
                className={`transition-all duration-300 ${isSidebarCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"}`}
              >
                New Chat
              </span>
            </Button>
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-auto p-4">
            <div className="flex items-start gap-4">
              <Avatar className="h-8 w-8 border">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="font-medium">You</div>
                <div className="prose prose-stone">
                  <p>
                    Hey, I wanted to follow up on the project we discussed earlier. Do you have any updates or files you
                    can share?
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4 mt-4">
              <Avatar className="h-8 w-8 border">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="font-medium">Jane Smith</div>
                <div className="prose prose-stone">
                  <p>Hi John, I just sent over the latest project files. Let me know if you need anything else.</p>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4 mt-4">
              <Avatar className="h-8 w-8 border">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="font-medium">You</div>
                <div className="prose prose-stone">
                  <p>Great, thanks! I'll take a look.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t bg-gray-100 p-4 dark:bg-gray-950 dark:border-gray-800">
            <div className="relative">
              <Input
                type="text"
                placeholder="Type your message..."
                className="w-full rounded-full border border-gray-300 bg-white px-4 py-2 pr-12 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <PaperclipIcon className="h-4 w-4" />
                  <span className="sr-only">Attach file</span>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <SendIcon className="h-4 w-4" />
                  <span className="sr-only">Send message</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


function MessageCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  )
}


function MoveHorizontalIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="18 8 22 12 18 16" />
      <polyline points="6 8 2 12 6 16" />
      <line x1="2" x2="22" y1="12" y2="12" />
    </svg>
  )
}


function PaperclipIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  )
}


function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}


function SendIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  )
}