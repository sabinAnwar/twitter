import fs from "node:fs/promises";
import type { Tweet } from "@/app/types/tweet";

export async function readTweets(): Promise<Tweet[]> {
  try {
    const data = await fs.readFile("tweets.json", { encoding: "utf8" });
    return JSON.parse(data) as Tweet[];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }
    throw err;
  }
}

export async function addTweet(content: string) {
  const tweets = await readTweets();
  tweets.push({ id: crypto.randomUUID(), content });
  await fs.writeFile("tweets.json", JSON.stringify(tweets), "utf-8");
}
