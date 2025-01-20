"use client";

import { Button } from "@/components/ui/button";

interface JokesPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function JokesPagination({
  currentPage,
  totalPages,
  onPageChange,
}: JokesPaginationProps) {
  return (
    <div className="mt-8 flex justify-center gap-2">
      <Button
        variant="outline"
        onClick={() => onPageChange(Math.max(0, currentPage - 1))}
        disabled={currentPage === 0}
      >
        Previous
      </Button>
      <span className="rounded-md bg-white px-4 py-2 shadow">
        Page {currentPage + 1} of {totalPages}
      </span>
      <Button
        variant="outline"
        onClick={() => onPageChange(Math.min(totalPages - 1, currentPage + 1))}
        disabled={currentPage >= totalPages - 1}
      >
        Next
      </Button>
    </div>
  );
}
