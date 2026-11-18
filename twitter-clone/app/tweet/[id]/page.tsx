import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import TweetCard from "@/app/components/TweetCard";
import { readTweets } from "@/app/lib/tweets";

interface TweetDetailProps {
  params: Promise<{ id: string }>;
}

async function TweetContent({ params }: TweetDetailProps) {
  const { id } = await params;
  const tweets = await readTweets();
  const tweet = tweets.find((t) => t.id === id);

  if (!tweet) {
    notFound();
  }

  return <TweetCard tweet={tweet} />;
}

export default function TweetDetail({ params }: TweetDetailProps) {
  return (
    <main>
      <Suspense fallback={<p>Loading tweet...</p>}>
        <TweetContent params={params} />
      </Suspense>
      <Link href="/" style={{ color: "blue", textDecoration: "underline" }}>
        ← Back to Feed
      </Link>
    </main>
  );
}
