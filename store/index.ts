const STORAGE_KEY = "jokes-ratings";

class JokesStore {
  private ratings: Map<string, { rating: number; votes: number }>;

  constructor() {
    this.ratings = new Map();
    if (typeof window !== "undefined") {
      this.loadFromStorage();
    }
  }

  private loadFromStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        this.ratings = new Map(Object.entries(data));
      }
    } catch (error) {
      console.error("Error loading ratings:", error);
    }
  }

  private saveToStorage() {
    try {
      const data = Object.fromEntries(this.ratings);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("Error saving ratings:", error);
    }
  }

  rateJoke(jokeId: string, rating: number) {
    const current = this.ratings.get(jokeId) || { rating: 0, votes: 0 };
    const newRating = {
      rating: (current.rating * current.votes + rating) / (current.votes + 1),
      votes: current.votes + 1,
    };
    this.ratings.set(jokeId, newRating);
    this.saveToStorage();
    return newRating;
  }

  getJokeRating(jokeId: string) {
    return this.ratings.get(jokeId) || { rating: 0, votes: 0 };
  }
}

export const localJokesStore = new JokesStore();
