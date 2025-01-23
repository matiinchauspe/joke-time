import { useContext } from "react";
import { JokesContext } from "@/context";

export const useJokes = () => {
  const context = useContext(JokesContext);
  if (!context) {
    throw new Error("useJokes must be used within a JokesProvider");
  }
  return context;
};
