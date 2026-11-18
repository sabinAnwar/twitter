// models/Tweet.ts
import { Schema, model, models, Model } from "mongoose";

// 1. The INTERFACE: what a tweet looks like, for TypeScript
export interface ITweet {
  content: string;
  author: string;
  upvotes: number;
  downvotes: number;
  createdAt: Date;
  updatedAt: Date;
}

// 2. The SCHEMA: the blueprint that Mongoose enforces at runtime
const TweetSchema = new Schema<ITweet>(
  {
    content: {
      type: String,
      required: true,
      maxlength: [280, "A tweet cannot be longer than 280 characters"],
    },
    author: {
      type: String,
      default: "anonymous",
    },
    upvotes: {
      type: Number,
      default: 0,
    },
    downvotes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

// 3. The MODEL (the "models.Tweet ??" part is for hot reloading, see the guide)
export const Tweet: Model<ITweet> =
  (models.Tweet as Model<ITweet>) ?? model<ITweet>("Tweet", TweetSchema);
