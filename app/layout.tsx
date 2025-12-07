import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Heart } from "lucide-react";
import Providers from "@/components/Providers";
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
        <Providers>
          <div className="min-h-screen gallery-gradient">
            <Header />
            <main className="flex-1">{children}</main>
            <footer className="py-8 text-center text-gray-500 text-sm border-t border-white/5">
              <p className="flex items-center justify-center gap-1 text-sm text-gray-500">
                Build with <Heart className="h-4 w-4" /> by{" "}
                <a href="https://www.linkedin.com/in/saiefalemon/" className="hover:underline">
                  Saief Al Emon
                </a>
              </p>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
