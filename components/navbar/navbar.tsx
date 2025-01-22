"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { useJokes } from "@/context";
import { AnimatePresence, motion } from "framer-motion";

import { SortOption } from "@/types";
import { cn } from "@/lib/utils";
import { useIsScrolled } from "@/hooks/use-is-scroll";
import { Icons } from "@/components/icons";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Navbar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isScrolled = useIsScrolled();
  const { fetchJokes } = useJokes();

  const sortBy = searchParams.get("sort") as SortOption;

  const setSortBy = (value: SortOption) => {
    router.push(`?sort=${value}`);
  };

  return (
    <div
      className={cn("fixed left-0 right-0 top-0 z-50 mx-auto w-full", {
        "border-b border-border": isScrolled,
      })}
    >
      <MaxWidthWrapper className="max-w-screen-xl">
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
      </MaxWidthWrapper>
    </div>
  );
};

export default Navbar;
