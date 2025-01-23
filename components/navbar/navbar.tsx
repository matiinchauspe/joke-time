"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import { SortOption } from "@/types";
import { cn } from "@/lib/utils";
import { useIsScrolled } from "@/hooks/use-is-scroll";
import { useJokes } from "@/hooks/use-jokes";
import { Icons } from "@/components/icons";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

  const sortBy = (searchParams.get("sort") as SortOption) ?? "newest";

  const setSortBy = (value: SortOption) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", value);
    router.push(`?${params.toString()}`);
  };

  const handleFetchJokesOnDemand = () => {
    fetchJokes({ onDemand: true });
  };

  return (
    <div
      className={cn("fixed left-0 right-0 top-0 z-50 mx-auto w-full", {
        "border-b border-border": isScrolled,
      })}
    >
      <MaxWidthWrapper className="max-w-screen-lg">
        <motion.div
          className="flex items-center justify-between rounded-lg bg-card/80 p-3 backdrop-blur-lg sm:p-4"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Mobile */}
            <div className="block sm:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Icons.Menu className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem onClick={() => setSortBy("newest")}>
                    <Icons.Clock className="mr-2 h-4 w-4" />
                    Newest
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("rating")}>
                    <Icons.Star className="mr-2 h-4 w-4" />
                    Highest Rated
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("votes")}>
                    <Icons.Users className="mr-2 h-4 w-4" />
                    Most Voted
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Desktop */}
            <div className="hidden sm:block">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="votes">Most Voted</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleFetchJokesOnDemand}
              variant="secondary"
              size="sm"
              className="sm:size-default"
            >
              <Icons.Refresh className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">New Jokes</span>
              <span className="sm:hidden">New</span>
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
                  className="hidden bg-gradient-to-r from-primary/90 to-primary-foreground/100 bg-clip-text text-xl font-bold text-transparent sm:block sm:text-2xl"
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
