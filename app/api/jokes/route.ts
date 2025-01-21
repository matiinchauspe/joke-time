import { NextResponse } from "next/server";

import { JokesTransformed } from "./jokes.transform";

export async function GET() {
  try {
    const res = await fetch("https://official-joke-api.appspot.com/random_ten");
    if (!res.ok) throw new Error("Failed to fetch jokes");
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
