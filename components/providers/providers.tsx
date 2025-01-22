"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

import { JokesProvider } from "./jokes-provider";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <JokesProvider>{children}</JokesProvider>
    </ThemeProvider>
  );
};

export default Providers;
