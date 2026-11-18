import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import TweetCard from "@/app/components/TweetCard";
import { readTweet } from "@/lib/tweets";

interface TweetDetailProps {
  params: Promise<{ id: string }>;
}

async function TweetContent({ params }: TweetDetailProps) {
  await connection();
  const { id } = await params;
  const tweet = await readTweet(id);

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
