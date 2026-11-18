// app/api/tweets/route.ts
import { makeSureDbIsReady } from "@/lib/db";
import { Tweet } from "@/models/Tweet";

// GET /api/tweets  →  return all tweets, newest first
export async function GET() {
  await makeSureDbIsReady();

  const tweets = await Tweet.find({}).sort({ createdAt: -1 });
  return Response.json(tweets);
}

// POST /api/tweets  →  create a new tweet
export async function POST(request: Request) {
  await makeSureDbIsReady();

  const body: { content?: string; author?: string } = await request.json();

  try {
    // We pick the fields ourselves, so nobody can sneak in e.g. upvotes: 9999
    const tweet = await Tweet.create({
      content: body.content,
      author: body.author,
    });
    return Response.json(tweet, { status: 201 });
  } catch (error) {
    // e.g. content missing or too long → Mongoose validation error
    const message =
      error instanceof Error ? error.message : "Error creating tweet";
    return Response.json({ error: message }, { status: 400 });
  }
}
