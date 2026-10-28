import { NextResponse } from "next/server";

interface Tweet {
  id: number;
  user: string;
  content: string;
  timestamp: string;
}

export async function GET() {
  const tweets: Tweet[] = [
    { id: 1, user: "JohnDoe", content: "Hello Next.js!", timestamp: "2m ago" },
    {
      id: 2,
      user: "JaneDoe",
      content: "Loving React & Next.js!",
      timestamp: "10m ago",
    },
  ];
  return NextResponse.json(tweets, { status: 200 });
}
