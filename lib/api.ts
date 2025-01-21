const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export async function getJokes() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 segundos de timeout

  try {
    const res = await fetch(`${getBaseUrl()}/api/jokes`, {
      signal: controller.signal,
    });
    if (!res.ok) throw new Error("Failed to fetch jokes");
    return res.json();
  } finally {
    clearTimeout(timeoutId);
  }
}

// Simulated local storage for ratings and votes since the API is read-only
export const localJokesStore = {
  ratings: new Map<string, { rating: number; votes: number }>(),

  rateJoke(jokeId: string, rating: number) {
    const current = this.ratings.get(jokeId) || { rating: 0, votes: 0 };
    const newRating = {
      rating: (current.rating * current.votes + rating) / (current.votes + 1),
      votes: current.votes + 1,
    };
    this.ratings.set(jokeId, newRating);
    return newRating;
  },

  getJokeRating(jokeId: string) {
    return this.ratings.get(jokeId) || { rating: 0, votes: 0 };
  },
};
