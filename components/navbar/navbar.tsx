"use client";

import { FC, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { SortOption } from "@/types";
import { Icons } from "@/components/icons";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type NavbarProps = {
  fetchJokes: () => void;
  setSortBy: (value: SortOption) => void;
  sortBy: SortOption;
};

const Navbar: FC<NavbarProps> = ({ fetchJokes, setSortBy, sortBy }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-50 mx-auto max-w-5xl"
      initial={{ y: 0 }}
      animate={{ y: isScrolled ? 0 : 0 }}
    >
      <motion.div
        className="flex items-center justify-between rounded-lg bg-card/80 p-4 backdrop-blur-lg"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex items-center gap-4">
          <Select
            value={sortBy}
            onValueChange={(value: SortOption) => setSortBy(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="votes">Most Voted</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={fetchJokes} variant="secondary">
            <Icons.Refresh className="mr-2 h-4 w-4" />
            New Jokes
          </Button>
          <AnimatePresence mode="wait">
            {isScrolled && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                  },
                }}
                exit={{
                  opacity: 0,
                  scale: 0.8,
                  transition: {
                    duration: 0.2,
                  },
                }}
                className="bg-gradient-to-r from-primary/90 to-primary-foreground/100 bg-clip-text text-2xl font-bold text-transparent"
              >
                JokeBox
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <ModeToggle />
      </motion.div>
    </motion.div>
  );
};

export default Navbar;
