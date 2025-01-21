"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { JokeTransformed, SortOption } from "@/types";
import { getJokes } from "@/lib/api";
import { localJokesStore } from "@/store";
import { Grid } from "@/components/grid";
import Navbar from "@/components/navbar/navbar";
import { Pagination } from "@/components/pagination";

interface JokesListProps {
  initialJokes: JokeTransformed[];
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const ITEMS_PER_PAGE = 5;

export function JokesList({ initialJokes, searchParams }: JokesListProps) {
  const router = useRouter();

  const page = Number(searchParams.page ?? "1") - 1; // Restamos 1 porque en la URL queremos que empiece en 1
  const sortBy = (searchParams.sort as SortOption) ?? "newest";

  const [jokes, setJokes] = useState<JokeTransformed[]>(() =>
    initialJokes.map((joke) => {
      const { rating, votes } = localJokesStore.getJokeRating(joke.id);
      return { ...joke, rating, votes };
    })
  );
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

  const sortedJokes = [...jokes].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      case "votes":
        return (b.votes || 0) - (a.votes || 0);
      default:
        return Number(b.id) - Number(a.id);
    }
  });

  const paginatedJokes = sortedJokes.slice(
    page * ITEMS_PER_PAGE,
    (page + 1) * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(jokes.length / ITEMS_PER_PAGE);

  return (
    <>
      <Navbar
        fetchJokes={fetchJokes}
        setSortBy={(sort: SortOption) => {
          const params = new URLSearchParams(
            searchParams as Record<string, string>
          );
          params.set("sort", sort);
          router.push(`?${params.toString()}`);
        }}
        sortBy={sortBy}
      />
      <div className="mt-4">
        {loading ? (
          <div className="py-8 text-center">Loading jokes...</div>
        ) : (
          <Grid data={paginatedJokes} onRate={handleRate} />
        )}
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage: number) => {
            const params = new URLSearchParams(
              searchParams as Record<string, string>
            );
            params.set("page", String(newPage + 1));
            router.push(`?${params.toString()}`);
          }}
        />
      </div>
    </>
  );
}
