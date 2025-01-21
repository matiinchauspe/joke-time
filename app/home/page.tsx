import { getJokes } from "@/lib/api";

import { Header } from "./components/header";
import { JokesList } from "./jokes-list";

export default async function Home() {
  const initialJokes = await getJokes();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10">
      <div className="mx-auto max-w-5xl p-6">
        <div className="mt-20">
          <Header />
          <JokesList initialJokes={initialJokes} />
        </div>
      </div>
    </div>
  );
}
