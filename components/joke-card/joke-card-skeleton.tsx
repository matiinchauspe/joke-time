"use client";

import { motion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const JokeCardSkeleton = () => {
  return (
    <Card className="overflow-hidden border-border/50 bg-card/95 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:bg-background/40 dark:shadow-md dark:shadow-primary/5">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
          </div>
          <div className="flex items-center justify-between border-t border-border/30 pt-4 dark:border-border/10">
            <Skeleton className="h-4 w-24" />
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-8 rounded-md" />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JokeCardSkeleton;
