import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { I18nProvider } from "@/lib/i18n";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "ProcureAI | Plataforma de Negociación B2B Inteligente",
  description: "Plataforma de procurement asistida por IA para negociaciones B2B en Latinoamérica.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body className={`${inter.variable} ${manrope.variable} antialiased selection:bg-primary/30`}>
        <I18nProvider>
          <div className="flex bg-background min-h-screen text-foreground overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto bg-surface-container-low relative fade-in">
              {children}
            </main>
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}
