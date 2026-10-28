// app/tweet/[id]/page.tsx
// 📌 Fetches and displays details for a single tweet
import { Suspense } from "react";
import type { Tweet } from "@/app/types/tweet";

async function getTweet(id: string): Promise<Tweet> {
  const res = await fetch(`https://dummyjson.com/posts/${id}`);
  if (!res.ok) {
    throw new Error(
      `Failed to fetch tweet ${id}: ${res.status} ${res.statusText}`,
    );
  }
  return res.json();
}

interface TweetDetailProps {
  params: Promise<{ id: string }>;
}

async function TweetContent({ params }: TweetDetailProps) {
  const { id } = await params;
  const tweet = await getTweet(id);

  return (
    <>
      <h1>{tweet.title}</h1>
      <p>{tweet.body}</p>
      <p>
        👍 {tweet.reactions.likes} | 👎 {tweet.reactions.dislikes}
      </p>
      <p>Tags: {tweet.tags.join(", ")}</p>
    </>
  );
}

export default function TweetDetail({ params }: TweetDetailProps) {
  return (
    <main>
      <Suspense fallback={<p>Loading tweet...</p>}>
        <TweetContent params={params} />
      </Suspense>
      <a href="/" style={{ color: "blue", textDecoration: "underline" }}>
        ← Back to Feed
      </a>
    </main>
  );
}
