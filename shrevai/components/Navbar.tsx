"use client";
import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ArrowRight, CircleUser, Menu } from "lucide-react";

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { GoDependabot } from "react-icons/go";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export default function Navbar() {
  return (
    // <div className="p-2 m-2 flex justify-between">
    //   <NavigationMenu>
    //     <NavigationMenuList>
    //       <NavigationMenuItem>
    //         <Link href="/" legacyBehavior passHref>
    //           <NavigationMenuLink className={navigationMenuTriggerStyle()}>
    //             <h3 className="text-lg text ">ShrevAI</h3>
    //           </NavigationMenuLink>
    //         </Link>
    //       </NavigationMenuItem>
    //     </NavigationMenuList>
    //   </NavigationMenu>
    //   <NavigationMenu>
    //     <NavigationMenuList>

    //       <NavigationMenuItem>
    //         <NavigationMenuTrigger>Products</NavigationMenuTrigger>
    //         <NavigationMenuContent>
    //           <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
    //             <li className="row-span-3">
    //               <NavigationMenuLink asChild>
    //                 <a
    //                   className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
    //                   href="/"
    //                 >
    //                   {/* <Icons.logo className="h-6 w-6" /> */}
    //                   <div className="mb-2 mt-4 text-lg font-medium">
    //                     shadcn/ui
    //                   </div>
    //                   <p className="text-sm leading-tight text-muted-foreground">
    //                     Beautifully designed components that you can copy and
    //                     paste into your apps. Accessible. Customizable. Open
    //                     Source.
    //                   </p>
    //                 </a>
    //               </NavigationMenuLink>
    //             </li>
    //             <ListItem href="/docs" title="Introduction">
    //               Re-usable components built using Radix UI and Tailwind CSS.
    //             </ListItem>
    //             <ListItem href="/docs/installation" title="Installation">
    //               How to install dependencies and structure your app.
    //             </ListItem>
    //             <ListItem href="/docs/primitives/typography" title="Typography">
    //               Styles for headings, paragraphs, lists...etc
    //             </ListItem>
    //           </ul>
    //         </NavigationMenuContent>
    //       </NavigationMenuItem>
    //       <NavigationMenuItem>
    //         <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
    //         <NavigationMenuContent>
    //           <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
    //             {components.map((component) => (
    //               <ListItem
    //                 key={component.title}
    //                 title={component.title}
    //                 href={component.href}
    //               >
    //                 {component.description}
    //               </ListItem>
    //             ))}
    //           </ul>
    //         </NavigationMenuContent>
    //       </NavigationMenuItem>
    //       <NavigationMenuItem>
    //         <Link href="/affiliates" legacyBehavior passHref>
    //           <NavigationMenuLink className={navigationMenuTriggerStyle()}>
    //             Affiliates
    //           </NavigationMenuLink>
    //         </Link>
    //       </NavigationMenuItem>
    //       <NavigationMenuItem>
    //         <Link href="/pricing" legacyBehavior passHref>
    //           <NavigationMenuLink className={navigationMenuTriggerStyle()}>
    //             Pricing
    //           </NavigationMenuLink>
    //         </Link>
    //       </NavigationMenuItem>
    //     </NavigationMenuList>
    //   </NavigationMenu>
    //   <NavigationMenu>
    //     <NavigationMenuList>
    //       <NavigationMenuItem>
    //         <Link href="/dashboard" legacyBehavior passHref>
    //           <NavigationMenuLink className={navigationMenuTriggerStyle()}>
    //             <Button>
    //               Dashboard <ArrowRight className="w-4 h-4" />
    //             </Button>
    //           </NavigationMenuLink>
    //         </Link>
    //       </NavigationMenuItem>
    //     </NavigationMenuList>
    //   <ModeToggle/>
    //   </NavigationMenu>
    // </div>
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 bg-white dark:bg-black z-40">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base  bg-red-500 text-white p-2 rounded-full"
          >
            <GoDependabot className="h-6 w-6" />
            {/* <span className="sr-only">ShrevAI</span> */}
            <span className="">ShrevAI</span>
          </Link>
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Dashboard
          </Link>
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Orders
          </Link>
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Products
          </Link>
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Customers
          </Link>
          <Link
            href="#"
            className="text-foreground transition-colors hover:text-foreground"
          >
            Settings
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <GoDependabot className="h-6 w-6" />
                <span className="sr-only">ShrevAI</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Dashboard
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Orders
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Products
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Customers
              </Link>
              <Link href="#" className="hover:text-foreground">
                Settings
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-4 ml-auto md:gap-2 lg:gap-4">
         
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
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
        </div>
      </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
