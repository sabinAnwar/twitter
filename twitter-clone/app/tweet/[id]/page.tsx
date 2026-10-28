// app/tweet/[id]/page.tsx
// 📌 Fetches and displays details for a single tweet
import type { Tweet } from "@/app/types/tweet";

async function getTweet(id: string): Promise<Tweet> {
  const res = await fetch(`https://dummyjson.com/posts/${id}`);
  return res.json();
}

interface TweetDetailProps {
  params: Promise<{ id: string }>;
}

export default async function TweetDetail({ params }: TweetDetailProps) {
  const { id } = await params;
  const tweet = await getTweet(id);

  return (
    <main>
      <h1>{tweet.title}</h1>
      <p>{tweet.body}</p>
      <p>
        👍 {tweet.reactions.likes} | 👎 {tweet.reactions.dislikes}
      </p>
      <p>Tags: {tweet.tags.join(", ")}</p>
      <a href="/" style={{ color: "blue", textDecoration: "underline" }}>
        ← Back to Feed
      </a>
    </main>
  );
}
