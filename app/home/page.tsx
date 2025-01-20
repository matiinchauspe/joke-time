import { getJokes } from "@/lib/api";

import { JokesList } from "./jokes-list";

export default async function Home() {
  const initialJokes = await getJokes();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto max-w-4xl p-6">
        <JokesList initialJokes={initialJokes} />
      </div>
    </div>
  );
}
