"use client";

import { ReactNode, useMemo, useState } from "react";
import { JokesContext } from "@/context";

import { JokeTransformed, SortOption } from "@/types";
import { getJokes } from "@/lib/api";
import { localJokesStore } from "@/store";

interface JokesProviderProps {
  children: ReactNode;
}

const JokesProvider = ({ children }: JokesProviderProps) => {
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

export default JokesProvider;
