"use client";

import { createContext } from "react";

import { JokeTransformed, SortOption } from "@/types";

interface JokesContextType {
  jokes: JokeTransformed[];
  fetchJokes: (params?: { onDemand?: boolean }) => Promise<void>;
  handleRate: (jokeId: string, rating: number) => void;
  setJokes: (jokes: JokeTransformed[]) => void;
  sortedJokes: (sortBy: SortOption) => JokeTransformed[];
}

export const JokesContext = createContext<JokesContextType>(
  {} as JokesContextType
);
