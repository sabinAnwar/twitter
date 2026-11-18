"use client";
import { useState } from "react";

export default function HelloPage() {
  const [text, setText] = useState("");

  async function handleSend() {
    await fetch("/api/hello", {
      method: "POST",
      body: JSON.stringify({ text }),
    });
    setText("");
  }

  return (
    <main>
      <h1>Hello Page</h1>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleSend}>Send</button>
    </main>
  );
}
