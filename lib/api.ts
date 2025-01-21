import { getBaseUrl } from "./utils";

export async function getJokes() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

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
