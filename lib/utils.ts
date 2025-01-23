import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_API_URL ?? `http://localhost:3000`;
};

export const ITEMS_PER_PAGE = 5;
