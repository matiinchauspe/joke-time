"use client";

import { ReactNode } from "react";
import { JokesProvider } from "@/context";
import { ThemeProvider } from "next-themes";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <JokesProvider>{children}</JokesProvider>
    </ThemeProvider>
  );
}
