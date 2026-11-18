// lib/tweets.ts
import { isValidObjectId } from "mongoose";
import { makeSureDbIsReady } from "@/lib/db";
import { Tweet as TweetModel } from "@/models/Tweet";
import type { Tweet } from "@/app/types/tweet";

// Find one tweet by its MongoDB _id, or null if it doesn't exist
export async function readTweet(id: string): Promise<Tweet | null> {
  // A malformed id would make Mongoose throw, so treat it as "not found"
  if (!isValidObjectId(id)) {
    return null;
  }

  await makeSureDbIsReady();

  const doc = await TweetModel.findById(id).lean();
  if (!doc) {
    return null;
  }

  return {
    _id: doc._id.toString(),
    content: doc.content,
    author: doc.author,
    upvotes: doc.upvotes,
    downvotes: doc.downvotes,
  };
}
