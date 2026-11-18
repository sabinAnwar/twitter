import { NextResponse, type NextRequest } from "next/server";

type HelloBody = { text: string };

export async function GET(request: NextRequest) {
  console.log("Request to", request.url);
  return NextResponse.json({ ping: "pong" });
}

export async function POST(request: NextRequest) {
  const body: HelloBody = await request.json();
  console.log("Received:", body.text);
  return NextResponse.json({ ok: true });
}
