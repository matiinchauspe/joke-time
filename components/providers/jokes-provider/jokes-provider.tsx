"use client";

import { ReactNode, useCallback, useMemo, useState } from "react";
import { JokesContext } from "@/context";

import { JokeTransformed, SortOption } from "@/types";
import { getJokes } from "@/lib/api";
import { localJokesStore } from "@/store";

interface JokesProviderProps {
  children: ReactNode;
}

const JokesProvider = ({ children }: JokesProviderProps) => {
  const [jokes, setJokes] = useState<JokeTransformed[]>([]);

  const applyStoredRatings = useCallback((jokesToUpdate: JokeTransformed[]) => {
    return jokesToUpdate.map((joke) => {
      const { rating, votes } = localJokesStore.getJokeRating(joke.id);
      return { ...joke, rating, votes };
    });
  }, []);

  const updateJokes = useCallback(
    (newJokes: JokeTransformed[]) => {
      const jokesWithRatings = applyStoredRatings(newJokes);
      setJokes(jokesWithRatings);
    },
    [applyStoredRatings]
  );

  const fetchJokes = async ({
    onDemand = false,
  }: { onDemand?: boolean } = {}) => {
    const newJokes = await getJokes({ onDemand });
    updateJokes(newJokes);

    return newJokes;
  };

  const handleRate = useCallback((jokeId: string, rating: number) => {
    const { rating: newRating, votes } = localJokesStore.rateJoke(
      jokeId,
      rating
    );
    setJokes((currentJokes) =>
      currentJokes.map((joke) =>
        joke.id === jokeId ? { ...joke, rating: newRating, votes } : joke
      )
    );
  }, []);

  const sortedJokes = useCallback(
    (sortBy: SortOption) =>
      [...jokes].sort((a, b) => {
        switch (sortBy) {
          case "rating":
            return (b.rating || 0) - (a.rating || 0);
          case "votes":
            return (b.votes || 0) - (a.votes || 0);
          default:
            return Number(b.id) - Number(a.id);
        }
      }),
    [jokes]
  );

  const value = useMemo(
    () => ({
      jokes,
      fetchJokes,
      handleRate,
      setJokes: updateJokes,
      sortedJokes,
    }),
    [jokes, handleRate, updateJokes, sortedJokes]
  );

  return (
    <JokesContext.Provider value={value}>{children}</JokesContext.Provider>
  );
};

export default JokesProvider;
