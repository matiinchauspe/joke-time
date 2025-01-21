import { Joke, JokeTransformed } from "@/types";

export const JokesTransformed = (jokes: Joke[]) => {
  return jokes.map((joke) => ({
    ...joke,
    rating: 0,
    votes: 0,
  }));
};
