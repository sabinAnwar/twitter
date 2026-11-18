import { NextResponse, type NextRequest } from "next/server";
import { addTweet, readTweets } from "@/app/lib/tweets";

type TweetBody = { content: string };

export async function GET() {
  const tweets = await readTweets();
  return NextResponse.json(tweets);
}

export async function POST(request: NextRequest) {
  const body: TweetBody = await request.json();
  await addTweet(body.content);
  return NextResponse.json({ ok: true });
}
