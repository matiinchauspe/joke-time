export async function getJokes() {
  const res = await fetch('https://official-joke-api.appspot.com/random_ten');
  if (!res.ok) throw new Error('Failed to fetch jokes');
  return res.json();
}

// Simulated local storage for ratings and votes since the API is read-only
export const localJokesStore = {
  ratings: new Map<number, { rating: number; votes: number }>(),
  
  rateJoke(jokeId: number, rating: number) {
    const current = this.ratings.get(jokeId) || { rating: 0, votes: 0 };
    const newRating = {
      rating: (current.rating * current.votes + rating) / (current.votes + 1),
      votes: current.votes + 1
    };
    this.ratings.set(jokeId, newRating);
    return newRating;
  },

  getJokeRating(jokeId: number) {
    return this.ratings.get(jokeId) || { rating: 0, votes: 0 };
  }
};