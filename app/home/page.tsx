"use client";

import { useEffect, useState } from "react";

import { Joke, SortOption } from "@/types";
import { getJokes, localJokesStore } from "@/lib/api";
import { Icons } from "@/components/icons";
import Navbar from "@/components/navbar/navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    fetchJokes();
  }, []);

  const rateJoke = (jokeId: number, rating: number) => {
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto max-w-4xl p-6">
        <Navbar fetchJokes={fetchJokes} setSortBy={setSortBy} sortBy={sortBy} />
        <div className="space-y-4">
          {loading ? (
            <div className="py-8 text-center">Loading jokes...</div>
          ) : (
            paginatedJokes.map((joke) => (
              <Card
                key={joke.id}
                className="p-6 transition-shadow hover:shadow-lg"
              >
                <div className="space-y-4">
                  <div>
                    <p className="mb-2 text-lg font-medium">{joke.setup}</p>
                    <p className="font-medium text-purple-600 dark:text-purple-400">
                      {joke.punchline}
                    </p>
                  </div>
                  <div className="flex items-center justify-between border-t pt-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">
                        Rating: {(joke.rating || 0).toFixed(1)} (
                        {joke.votes || 0} votes)
                      </span>
                    </div>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Button
                          key={star}
                          variant="ghost"
                          size="sm"
                          onClick={() => rateJoke(joke.id, star)}
                          className={`p-1 ${
                            (joke.rating || 0) >= star
                              ? "text-yellow-500"
                              : "text-gray-300"
                          }`}
                        >
                          <Icons.Start className="h-4 w-4" />
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        <div className="mt-8 flex justify-center gap-2">
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
          >
            Previous
          </Button>
          <span className="rounded-md bg-white px-4 py-2 shadow">
            Page {page + 1} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
