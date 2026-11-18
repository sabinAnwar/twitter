"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TweetForm() {
  const [content, setContent] = useState("");
  const router = useRouter();

  async function handleSend() {
    await fetch("/api/tweets", {
      method: "POST",
      body: JSON.stringify({ content }),
    });
    setContent("");
    router.refresh();
  }

  return (
    <div>
      <input value={content} onChange={(e) => setContent(e.target.value)} />
      <button onClick={handleSend}>Tweet</button>
    </div>
  );
}
