// components/TweetCard.tsx

import type { Tweet } from "@/app/types/tweet";

interface TweetCardProps {
  tweet: Tweet;
}

export default function TweetCard({ tweet }: TweetCardProps) {
  return (
    <div style={{ border: "1px solid #ddd", padding: "10px", margin: "10px" }}>
      <p>{tweet.content}</p>
    </div>
  );
}
