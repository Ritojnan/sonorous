import { Metadata } from "next";
import { Inter } from "next/font/google";
import { EmployeeProvider } from "@/Context/EmployeeContext";
import "./globals.css";

import { TooltipProvider } from "@/components/ui/tooltip";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ShrevAI",
  description: "Chatbots with CRM - Scale Faster with AI",
};
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <EmployeeProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider>
              <main>{children}</main>
              <Toaster />
            </TooltipProvider>
          </ThemeProvider>
        </EmployeeProvider>
      </body>
    </html>
  );
}
