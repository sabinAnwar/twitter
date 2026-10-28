// types/tweet.ts
// 📌 Describes the shape of the data returned by DummyJSON

export interface Tweet {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
  userId: number;
}

export interface TweetsResponse {
  posts: Tweet[];
  total: number;
  skip: number;
  limit: number;
}
