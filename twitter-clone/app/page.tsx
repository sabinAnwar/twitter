// app/page.tsx
import { Suspense } from "react";
import Link from "next/link";
import TweetCard from "@/app/components/TweetCard";
import type { TweetsResponse } from "@/app/types/tweet";

async function getTweets(): Promise<TweetsResponse> {
  const res = await fetch("https://dummyjson.com/posts");
  if (!res.ok) {
    throw new Error(`Failed to fetch tweets: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

async function TweetList() {
  const tweets = await getTweets();

  return tweets.posts.map((tweet) => (
    <Link key={tweet.id} href={`/tweet/${tweet.id}`}>
      <TweetCard tweet={tweet} />
    </Link>
  ));
}



export default function HomePage() {
  return (
    <main>
      <h1>📝 Latest Tweets</h1>
      <Suspense fallback={<p>Loading tweets...</p>}>
        <TweetList />
      </Suspense>
    </main>
  );
}
