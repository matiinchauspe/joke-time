"use client";

import { motion } from "framer-motion";

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-12 text-center"
    >
      <motion.h1
        className="mb-4 bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-5xl font-bold text-transparent"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        JokeBox
      </motion.h1>
      <motion.p
        className="text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Your daily dose of laughter, one joke at a time
      </motion.p>
    </motion.header>
  );
}
