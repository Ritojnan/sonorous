"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import Image from "next/image";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  ChevronLeft,
  ChevronRight,
  CircleUser,
  Copy,
  CreditCard,
  File,
  Home,
  LineChart,
  ListFilter,
  Loader,
  MoreVertical,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  Truck,
  Users2,
} from "lucide-react";
import { GoDependabot } from "react-icons/go";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/Navbar";
import { useEmployeeContext } from "@/Context/EmployeeContext";
import Createcompany from "@/components/createcompany"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const pathSegments = pathname?.split("/").filter((segment) => segment !== "");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const router = useRouter();
  const { user, setUser } = useEmployeeContext();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await fetch("/api/validate-token", {
          headers: {
            Authorization: "Bearer " + Cookies.get("token"),
          },
        });
        const data = await response.json();
        setIsValid(data.valid);
        setUser(data.user);
        if (!data.valid) {
          router.push("/login");
        }
      } catch (error) {
        console.error("Token validation error:", error);
        setIsValid(false);
        router.push("/login");
      }
    };

    checkToken();
  }, [router, setUser]);

  if (isValid === null) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader className="w-12 h-12 text-grey-500 animate-spin" />
      </div>
    );
  }

  if (user?.companyId === null && isValid) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Createcompany />
      </div>
    );
  }



  return (

      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <Link
              href="/"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base bg-red-500 transition-all hover:scale-110"
            >
              <GoDependabot className="h-5 w-5 text-black hover:text-white" />
              <span className="sr-only">ShrevAI</span>
            </Link>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard"
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    pathname === "/dashboard"
                      ? "bg-zinc-200 dark:bg-zinc-800 text-accent-foreground"
                      : "text-foreground"
                  }   text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8`}
                >
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard/chatbots"
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    pathname?.includes("/dashboard/chatbots")
                      ? "bg-zinc-200 dark:bg-zinc-800 text-accent-foreground"
                      : "text-foreground"
                  }   text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8`}
                >
                  <GoDependabot className="h-5 w-5" />
                  <span className="sr-only">Chatbots</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Chatbots</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard/leads"
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    pathname?.includes("/dashboard/leads")
                      ? "bg-zinc-200 dark:bg-zinc-800 text-accent-foreground"
                      : "text-foreground"
                  }   text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8`}
                >
                  <Users2 className="h-5 w-5" />
                  <span className="sr-only">Leads</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Leads</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard/analytics"
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    pathname?.includes("/dashboard/analytics")
                      ? "bg-zinc-200 dark:bg-zinc-800 text-accent-foreground"
                      : "text-foreground"
                  }   text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8`}
                >
                  <LineChart className="h-5 w-5" />
                  <span className="sr-only">Analytics</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Analytics</TooltipContent>
            </Tooltip>
          </nav>
          <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard/settings"
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    pathname?.includes("/dashboard/settings")
                      ? "bg-zinc-200 dark:bg-zinc-800 text-accent-foreground"
                      : "text-foreground"
                  }   text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8`}
                >
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
          </nav>
        </aside>

        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="sm:hidden">
                  <PanelLeft className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="sm:max-w-xs">
                <nav className="grid gap-6 text-lg font-medium">
                  <Link
                    href="/"
                    className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                  >
                    <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                    <span className="sr-only">ShrevAI</span>
                  </Link>
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <Home className="h-5 w-5" />
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/chatbots"
                    className="flex items-center gap-4 px-2.5 text-foreground"
                  >
                    <GoDependabot className="h-5 w-5" />
                    Chatbots
                  </Link>
                  <Link
                    href="/dashboard/leads"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <Package className="h-5 w-5" />
                    Leads
                  </Link>
                  <Link
                    href="/dashboard/analytics"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <Users2 className="h-5 w-5" />
                    Analytics
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <LineChart className="h-5 w-5" />
                    Settings
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <Breadcrumb className="hidden md:flex">
              <BreadcrumbList>
                {pathSegments?.map((segment, index) => {
                  const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
                  const capitalizedSegment =
                    segment.charAt(0).toUpperCase() + segment.slice(1);
                  return (
                    <React.Fragment key={segment}>
                      <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                          {index === pathSegments.length - 1 ? (
                            <span>{capitalizedSegment}</span>
                          ) : (
                            <Link href={path}>{capitalizedSegment}</Link>
                          )}
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      {index < pathSegments.length - 1 && (
                        <BreadcrumbSeparator />
                      )}
                    </React.Fragment>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>

            <div className="relative ml-auto flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
              />
            </div>
            <div className="hidden md:flex">
              <ModeToggle />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <span className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="overflow-hidden rounded-full"
                  >
                    <Avatar className="h-8 w-8 border">
                      <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                  <div className="hidden md:flex md:flex-col">
                    <span>
                      {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {user?.email}
                    </span>
                  </div>
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          {children}
        </div>
      </div>
  );
}
