import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://official-joke-api.appspot.com/random_ten");
    if (!res.ok) throw new Error("Failed to fetch jokes");
    const jokes = await res.json();

    return NextResponse.json(jokes);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch jokes" },
      { status: 500 }
    );
  }
}
