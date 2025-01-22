import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import Providers from "@/components/providers/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JokeBox - Your Daily Dose of Humor",
  description: "Discover and rate funny jokes every day",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={cn("relative h-full font-sans antialiased", inter.className)}
      >
        <Providers>
          <Navbar />
          <div className="flex-1 flex-grow">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
