"use client";

import { motion } from "framer-motion";

import JokeCardSkeleton from "@/components/joke-card/joke-card-skeleton";

const GridSkeleton = () => {
  return (
    <motion.div className="space-y-4 pb-20 sm:pb-24">
      {Array.from({ length: 5 }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <JokeCardSkeleton />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default GridSkeleton;
