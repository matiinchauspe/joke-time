"use client";

import { JokeTransformed } from "@/types";

import { JokeCard } from "./joke-card";

interface JokesGridProps {
  jokes: JokeTransformed[];
  onRate: (jokeId: string, rating: number) => void;
}

export function JokesGrid({ jokes, onRate }: JokesGridProps) {
  return (
    <div className="space-y-4">
      {jokes.map((joke, index) => (
        <JokeCard key={joke.id} joke={joke} onRate={onRate} index={index} />
      ))}
    </div>
  );
}
