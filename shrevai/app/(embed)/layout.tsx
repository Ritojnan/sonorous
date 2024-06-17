import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ShrevAI",
  description: "Chatbots with CRM - Scale Faster with AI",
};


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>

          <main>{children}</main>
      </body>
    </html>
  );
}
