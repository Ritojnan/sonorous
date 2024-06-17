import { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

import { TooltipProvider } from "@/components/ui/tooltip";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ShrevAI",
  description: "Chatbots with CRM - Scale Faster with AI",
};
import { ThemeProvider } from "@/components/theme-provider"


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <TooltipProvider>
          <main>{children}</main>
        </TooltipProvider>
          </ThemeProvider>
      </body>
    </html>
  );
}
