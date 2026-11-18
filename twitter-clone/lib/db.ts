// lib/db.ts
import mongoose from "mongoose";
import assert from "node:assert";

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// Tell TypeScript that we store a cache on the global object
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

// A little "memory" that survives hot reloads (see the guide for why)
const cached: MongooseCache = global.mongoose ?? {
  conn: null,
  promise: null,
};
global.mongoose = cached;

export async function makeSureDbIsReady() {
  if (cached.conn) {
    return cached.conn;
  }

  const MONGODB_URI = process.env.MONGODB_URI;
  assert(
    MONGODB_URI,
    "Please define the MONGODB_URI environment variable inside .env.local",
  );

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    // If connecting failed, forget the failed promise so the next call can try again
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}
