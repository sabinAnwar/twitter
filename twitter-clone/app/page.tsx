// app/page.tsx
"use client";
import { SubmitEvent, useEffect, useState } from "react";
import Link from "next/link";
import type { Tweet } from "@/app/types/tweet";

export default function Home() {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [content, setContent] = useState("");

  // Load all tweets once, when the page opens
  useEffect(() => {
    async function loadTweets() {
      const res = await fetch("/api/tweets");
      const data: Tweet[] = await res.json();
      setTweets(data);
    }
    loadTweets();
  }, []);

  // Create a new tweet
  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const res = await fetch("/api/tweets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    if (!res.ok) {
      const err: { error: string } = await res.json();
      alert(err.error);
      return;
    }

    const newTweet: Tweet = await res.json();
    setTweets([newTweet, ...tweets]);
    setContent("");
  }

  // Up- or downvote a tweet, then swap in the updated tweet from the server
  async function handleVote(id: string, type: "up" | "down") {
    const res = await fetch(`/api/tweets/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type }),
    });

    if (!res.ok) return;

    const updatedTweet: Tweet = await res.json();
    setTweets((current) =>
      current.map((t) => (t._id === updatedTweet._id ? updatedTweet : t)),
    );
  }

  return (
    <main>
      <h1>My Twitter Clone</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's happening?"
        />
        <button type="submit">Tweet</button>
      </form>

      <ul>
        {tweets.map((tweet) => (
          <li key={tweet._id}>
            <Link href={`/tweet/${tweet._id}`}>{tweet.content}</Link>
            <button onClick={() => handleVote(tweet._id, "up")}>
              👍 {tweet.upvotes}
            </button>
            <button onClick={() => handleVote(tweet._id, "down")}>
              👎 {tweet.downvotes}
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
