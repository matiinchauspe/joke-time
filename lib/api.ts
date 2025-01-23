import { getBaseUrl } from "./utils";

export async function getJokes({
  onDemand = false,
}: { onDemand?: boolean } = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const res = await fetch(
      `${getBaseUrl()}/api/jokes${onDemand ? "?onDemand=true" : ""}`,
      {
        signal: controller.signal,
        cache: onDemand ? "no-store" : "default",
      }
    );

    if (!res.ok) throw new Error("Failed to fetch jokes");
    return res.json();
  } finally {
    clearTimeout(timeoutId);
  }
}
