import type { Metadata } from "next";
import { Outfit, Lora } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import NightSky from "@/components/NightSky";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700"],
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "EventSync — Plateforme d'événements",
  description: "Naviguer dans vos événements en temps réel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${outfit.variable} ${lora.variable} font-sans bg-[#060c18] min-h-screen text-white`}>
        <NightSky />
        <NavBar />
        <main className="relative z-10 pt-14 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}