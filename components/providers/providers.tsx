"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

import { JokesProvider } from "./jokes-provider";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <JokesProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </JokesProvider>
  );
};

export default Providers;
