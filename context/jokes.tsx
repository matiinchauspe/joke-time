"use client";

import { createContext, ReactNode, useContext, useMemo, useState } from "react";

import { JokeTransformed, SortOption } from "@/types";
import { getJokes } from "@/lib/api";
import { localJokesStore } from "@/store";

interface JokesContextType {
  jokes: JokeTransformed[];
  loading: boolean;
  fetchJokes: () => Promise<void>;
  handleRate: (jokeId: string, rating: number) => void;
  setJokes: (jokes: JokeTransformed[]) => void;
  sortedJokes: (sortBy: SortOption) => JokeTransformed[];
}

export const JokesContext = createContext<JokesContextType>(
  {} as JokesContextType
);

interface JokesProviderProps {
  children: ReactNode;
}

export const JokesProvider = ({ children }: JokesProviderProps) => {
  const [jokes, setJokes] = useState<JokeTransformed[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchJokes = async () => {
    setLoading(true);
    try {
      const newJokes = await getJokes();
      const jokesWithRatings = newJokes.map((joke: JokeTransformed) => {
        const { rating, votes } = localJokesStore.getJokeRating(joke.id);
        return { ...joke, rating, votes };
      });
      setJokes(jokesWithRatings);
    } catch (error) {
      console.error("Failed to fetch jokes:", error);
    }
    setLoading(false);
  };

  const handleRate = (jokeId: string, rating: number) => {
    const { rating: newRating, votes } = localJokesStore.rateJoke(
      jokeId,
      rating
    );
    setJokes(
      jokes.map((joke) =>
        joke.id === jokeId ? { ...joke, rating: newRating, votes } : joke
      )
    );
  };

  const sortedJokes = (sortBy: SortOption) =>
    [...jokes].sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "votes":
          return (b.votes || 0) - (a.votes || 0);
        default:
          return Number(b.id) - Number(a.id);
      }
    });

  const value = useMemo(
    () => ({
      jokes,
      loading,
      fetchJokes,
      handleRate,
      setJokes,
      sortedJokes,
    }),
    [jokes, loading]
  );

  return (
    <JokesContext.Provider value={value}>{children}</JokesContext.Provider>
  );
};

export const useJokes = () => {
  const context = useContext(JokesContext);
  if (!context) {
    throw new Error("useJokes must be used within a JokesProvider");
  }
  return context;
};
