import { FC } from "react";

import { SortOption } from "@/types";
import { Icons } from "@/components/icons";
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
  return (
    <div className="mb-8 flex items-center justify-between">
      <h1 className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-4xl font-bold text-transparent">
        Joke Time!
      </h1>
      <div className="flex gap-4">
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
        <Button onClick={fetchJokes} variant="outline">
          <Icons.Refresh className="mr-2 h-4 w-4" />
          Refresh Jokes
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
