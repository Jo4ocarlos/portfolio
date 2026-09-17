import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "João Carlos | Engenharia & Automações",
  description: "Portfólio de Engenharia Full Stack e Automações Corporativas",
};

// CONTRATO ESTRITO: Definimos explicitamente a interface do layout raiz
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}