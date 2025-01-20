"use client";

import { useState } from "react";

import { Joke, SortOption } from "@/types";
import { getJokes, localJokesStore } from "@/lib/api";
import Navbar from "@/components/navbar/navbar";

import { JokesGrid } from "./components/jokes-grid";
import { JokesPagination } from "./components/jokes-pagination";

interface JokesListProps {
  initialJokes: Joke[];
}

export function JokesList({ initialJokes }: JokesListProps) {
  const [jokes, setJokes] = useState<Joke[]>(() =>
    initialJokes.map((joke) => {
      const { rating, votes } = localJokesStore.getJokeRating(joke.id);
      return { ...joke, rating, votes };
    })
  );
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [page, setPage] = useState(0);
  const jokesPerPage = 5;

  const fetchJokes = async () => {
    setLoading(true);
    try {
      const newJokes = await getJokes();
      const jokesWithRatings = newJokes.map((joke: Joke) => {
        const { rating, votes } = localJokesStore.getJokeRating(joke.id);
        return { ...joke, rating, votes };
      });
      setJokes(jokesWithRatings);
    } catch (error) {
      console.error("Failed to fetch jokes:", error);
    }
    setLoading(false);
  };

  const handleRate = (jokeId: number, rating: number) => {
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

  const sortedJokes = [...jokes].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      case "votes":
        return (b.votes || 0) - (a.votes || 0);
      default:
        return b.id - a.id;
    }
  });

  const paginatedJokes = sortedJokes.slice(
    page * jokesPerPage,
    (page + 1) * jokesPerPage
  );

  const totalPages = Math.ceil(jokes.length / jokesPerPage);

  return (
    <>
      <Navbar fetchJokes={fetchJokes} setSortBy={setSortBy} sortBy={sortBy} />
      {loading ? (
        <div className="py-8 text-center">Loading jokes...</div>
      ) : (
        <JokesGrid jokes={paginatedJokes} onRate={handleRate} />
      )}
      <JokesPagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </>
  );
}
