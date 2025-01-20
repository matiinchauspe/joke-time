"use client";

import { Joke } from "@/types";

import { JokeCard } from "./joke-card";

interface JokesGridProps {
  jokes: Joke[];
  onRate: (jokeId: number, rating: number) => void;
}

export function JokesGrid({ jokes, onRate }: JokesGridProps) {
  return (
    <div className="space-y-4">
      {jokes.map((joke) => (
        <JokeCard key={joke.id} joke={joke} onRate={onRate} />
      ))}
    </div>
  );
}
