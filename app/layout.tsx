import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rezerve - Akıllı Randevu Yönetimi",
  description: "Modern, kullanıcı dostu randevu yönetim sistemi. Randevu alın, takip edin, yönetin.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${outfit.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-[var(--background)] font-sans antialiased">
        <Navbar />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
