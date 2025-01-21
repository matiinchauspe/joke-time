"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface JokesPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: JokesPaginationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 flex justify-center gap-3"
    >
      <Button
        variant="outline"
        size="lg"
        onClick={() => onPageChange(Math.max(0, currentPage - 1))}
        disabled={currentPage === 0}
        className="group relative"
      >
        <ChevronLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        Previous
      </Button>

      <Card className="flex items-center justify-center border-border/50 bg-card/95 px-6 shadow-lg backdrop-blur dark:bg-card/30 dark:shadow-md dark:shadow-primary/5">
        <span className="text-sm font-medium">
          Page {currentPage + 1} of {totalPages}
        </span>
      </Card>

      <Button
        variant="outline"
        size="lg"
        onClick={() => onPageChange(Math.min(totalPages - 1, currentPage + 1))}
        disabled={currentPage >= totalPages - 1}
        className="group relative"
      >
        Next
        <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Button>
    </motion.div>
  );
};

export default Pagination;
