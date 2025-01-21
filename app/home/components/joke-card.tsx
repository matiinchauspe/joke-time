"use client";

import { motion } from "framer-motion";

import { JokeTransformed } from "@/types";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface JokeCardProps {
  joke: JokeTransformed;
  onRate: (jokeId: string, rating: number) => void;
  index: number;
}

export function JokeCard({ joke, onRate, index }: JokeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="overflow-hidden border-border/50 bg-card/95 shadow-lg backdrop-blur dark:bg-card/30 dark:shadow-md dark:shadow-primary/5">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-xl font-medium leading-relaxed text-foreground/90">
                {joke.setup}
              </p>
              <p className="font-medium text-primary/90 dark:text-primary/80">
                {joke.punchline}
              </p>
            </div>
            <div className="flex items-center justify-between border-t border-border/30 pt-4 dark:border-border/10">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground/70 dark:text-muted-foreground/60">
                  Rating: {(joke.rating || 0).toFixed(1)} ({joke.votes || 0}{" "}
                  votes)
                </span>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Button
                    key={star}
                    variant="ghost"
                    size="sm"
                    onClick={() => onRate(joke.id, star)}
                    className={`hover:text-yellow-500 dark:hover:text-yellow-400 ${
                      (joke.rating || 0) >= star
                        ? "text-yellow-500 dark:text-yellow-400"
                        : "text-muted-foreground/30 dark:text-muted-foreground/20"
                    }`}
                  >
                    <Icons.Star className="h-4 w-4" />
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
