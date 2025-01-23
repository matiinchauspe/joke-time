import { NextResponse } from "next/server";

import { JokesTransformed } from "./jokes.transform";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const isOnDemand = searchParams.get("onDemand") === "true";

    // Use a different timestamp to force a new request
    const url = isOnDemand
      ? `https://official-joke-api.appspot.com/random_ten?t=${Date.now()}`
      : "https://official-joke-api.appspot.com/random_ten";

    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch jokes");

    await delay(2000); // Simulate a slow response

    const jokes = await res.json();
    const jokesTransformed = JokesTransformed(jokes);

    return NextResponse.json(jokesTransformed);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch jokes" },
      { status: 500 }
    );
  }
}
