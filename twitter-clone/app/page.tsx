// app/page.tsx
import Link from "next/link";
import TweetCard from "@/components/TweetCard";
import type { TweetsResponse } from "@/types/tweet";

async function getTweets(): Promise<TweetsResponse> {
  const res = await fetch("https://dummyjson.com/posts");
  return res.json();
}

export default async function HomePage() {
  const tweets = await getTweets();

  return (
    <main>
      <h1>📝 Latest Tweets</h1>
      {tweets.posts.map((tweet) => (
        <Link key={tweet.id} href={`/tweet/${tweet.id}`}>
          <TweetCard tweet={tweet} />
        </Link>
      ))}
    </main>
  );
}
