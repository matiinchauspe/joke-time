"use client";

import { Joke } from "@/types";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface JokeCardProps {
  joke: Joke;
  onRate: (jokeId: number, rating: number) => void;
}

export function JokeCard({ joke, onRate }: JokeCardProps) {
  return (
    <Card className="p-6 transition-shadow hover:shadow-lg">
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
              Rating: {(joke.rating || 0).toFixed(1)} ({joke.votes || 0} votes)
            </span>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Button
                key={star}
                variant="ghost"
                size="sm"
                onClick={() => onRate(joke.id, star)}
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
  );
}
