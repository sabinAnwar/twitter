// app/page.tsx
import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import TweetCard from "@/app/components/TweetCard";
import TweetForm from "@/app/components/TweetForm";
import { readTweets } from "@/app/lib/tweets";

async function TweetList() {
  await connection();
  const tweets = await readTweets();

  return tweets.map((tweet) => (
    <Link key={tweet.id} href={`/tweet/${tweet.id}`}>
      <TweetCard tweet={tweet} />
    </Link>
  ));
}

export default function HomePage() {
  return (
    <main>
      <h1>📝 Latest Tweets</h1>
      <TweetForm />
      <Suspense fallback={<p>Loading tweets...</p>}>
        <TweetList />
      </Suspense>
    </main>
  );
}
