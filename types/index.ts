export interface Joke {
  id: number;
  type: string;
  setup: string;
  punchline: string;
  rating?: number;
  votes?: number;
}

export interface JokeTransformed extends Omit<Joke, "id"> {
  id: string;
  rating: number;
  votes: number;
}

export type SortOption = "newest" | "rating" | "votes";
