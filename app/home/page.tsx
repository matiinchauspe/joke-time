import { Suspense } from "react";

import { getJokes } from "@/lib/api";
import { Await } from "@/components/await";
import GridSkeleton from "@/components/grid/grid-skeleton";
import { Header } from "@/components/header";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";

import { JokesList } from "./jokes-list";

export default async function Home({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) {
  const promise = getJokes();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10">
      <MaxWidthWrapper className="max-w-screen-lg">
        <div className="mt-20">
          <Header />
          <div className="mt-4">
            <Suspense
              fallback={<GridSkeleton />}
              key={JSON.stringify(searchParams)}
            >
              <Await promise={promise}>
                {(jokes) => (
                  <JokesList initialJokes={jokes} searchParams={searchParams} />
                )}
              </Await>
            </Suspense>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
