"use client";

import { AnimatePresence, motion } from "framer-motion";

import { JokeTransformed } from "@/types";
import { JokeCard } from "@/components/joke-card";

interface JokesGridProps {
  data: JokeTransformed[];
  onRate: (jokeId: string, rating: number) => void;
}

const Grid = ({ data, onRate }: JokesGridProps) => {
  return (
    <motion.div className="space-y-4" layout>
      <AnimatePresence mode="popLayout">
        {data.map((joke, index) => (
          <motion.div
            key={joke.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              layout: {
                type: "spring",
                stiffness: 200,
                damping: 25,
              },
            }}
          >
            <JokeCard joke={joke} onRate={onRate} index={index} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default Grid;
