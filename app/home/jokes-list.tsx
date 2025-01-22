"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { JokeTransformed, SortOption } from "@/types";
import { useJokes } from "@/hooks/use-jokes";
import { Grid } from "@/components/grid";
import { Pagination } from "@/components/pagination";

const ITEMS_PER_PAGE = 5;

interface JokesListProps {
  initialJokes: JokeTransformed[];
  searchParams: { [key: string]: string | string[] | undefined };
}

export function JokesList({ initialJokes, searchParams }: JokesListProps) {
  const router = useRouter();
  const { setJokes, handleRate, loading, sortedJokes } = useJokes();

  const page = Number(searchParams.page ?? "1") - 1;
  const sortBy = (searchParams.sort as SortOption) ?? "newest";

  useEffect(() => {
    setJokes(initialJokes);
  }, [initialJokes, setJokes]);

  const sorted = sortedJokes(sortBy);
  const paginatedJokes = sorted.slice(
    page * ITEMS_PER_PAGE,
    (page + 1) * ITEMS_PER_PAGE
  );
  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);

  return (
    <div className="mt-4">
      <Grid data={paginatedJokes} onRate={handleRate} />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(newPage: number) => {
          const params = new URLSearchParams(
            searchParams as Record<string, string>
          );
          params.set("page", String(newPage + 1));
          router.push(`?${params.toString()}`);
        }}
      />
    </div>
  );
}
