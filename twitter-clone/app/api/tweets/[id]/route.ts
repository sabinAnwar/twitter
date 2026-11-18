// app/api/tweets/[id]/route.ts
import { makeSureDbIsReady } from "@/lib/db";
import { Tweet } from "@/models/Tweet";

type RouteContext = { params: Promise<{ id: string }> };

// PATCH /api/tweets/<id>  with body { "type": "up" } or { "type": "down" }
export async function PATCH(request: Request, { params }: RouteContext) {
  await makeSureDbIsReady();

  const { id } = await params;
  const { type }: { type?: string } = await request.json();

  const field =
    type === "up" ? "upvotes" : type === "down" ? "downvotes" : null;

  if (!field) {
    return Response.json(
      { error: 'type must be "up" or "down"' },
      { status: 400 },
    );
  }

  try {
    const tweet = await Tweet.findByIdAndUpdate(
      id,
      { $inc: { [field]: 1 } },
      { new: true },
    );

    if (!tweet) {
      return Response.json({ error: "Tweet not found" }, { status: 404 });
    }

    return Response.json(tweet);
  } catch (error) {
    return Response.json({ error: "Invalid tweet id" }, { status: 400 });
  }
}
