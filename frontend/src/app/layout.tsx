import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "ProcureAI | Intelligent B2B Negotiation",
  description: "Next-gen AI-assisted procurement and negotiation platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${manrope.variable} antialiased selection:bg-primary/30`}>
        <div className="flex bg-background min-h-screen text-foreground overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto bg-surface-container-low relative">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
