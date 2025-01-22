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
      className="mt-6 flex justify-center gap-2 sm:mt-8 sm:gap-3"
    >
      <Button
        variant="outline"
        size="default"
        onClick={() => onPageChange(Math.max(0, currentPage - 1))}
        disabled={currentPage === 0}
        className="group relative"
      >
        <ChevronLeft className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-0.5 sm:mr-2" />
        <span className="hidden sm:inline">Previous</span>
      </Button>

      <Card className="flex items-center justify-center border-border/50 bg-card/95 px-4 shadow-lg backdrop-blur dark:bg-card/30 dark:shadow-md dark:shadow-primary/5 sm:px-6">
        <span className="text-xs font-medium sm:text-sm">
          {currentPage + 1} / {totalPages}
        </span>
      </Card>

      <Button
        variant="outline"
        size="default"
        onClick={() => onPageChange(Math.min(totalPages - 1, currentPage + 1))}
        disabled={currentPage >= totalPages - 1}
        className="group relative"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5 sm:ml-2" />
      </Button>
    </motion.div>
  );
};

export default Pagination;
