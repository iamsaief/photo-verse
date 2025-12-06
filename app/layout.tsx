import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Header from "@/components/Header";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Photo Gallery | Curated Photography Collection",
  description:
    "Discover stunning photographs from talented photographers around the world. Browse, save favorites, and explore beautiful imagery.",
  keywords: ["photography", "gallery", "photos", "images", "art"],
  openGraph: {
    title: "Photo Gallery",
    description: "Curated photography collection",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <div className="min-h-screen gallery-gradient">
          <Header />
          <main className="flex-1">{children}</main>
          <footer className="py-8 text-center text-gray-500 text-sm border-t border-white/10">
            <p>© 2024 Photo Gallery. All rights reserved.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
