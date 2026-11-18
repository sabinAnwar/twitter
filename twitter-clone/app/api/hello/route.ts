import { NextResponse, type NextRequest } from "next/server";
import fs from "node:fs/promises";
type HelloBody = { text: string };

export async function GET(request: NextRequest) {
  try {
    const data: string = await fs.readFile("/Users/joe/test.txt", {
      encoding: "utf8",
    });
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") {
      return NextResponse.json({ note: "No note yet" }, { status: 404 });
    }
    throw err;
  }

  console.log("Request to", request.url);
  return NextResponse.json({ ping: "pong" });
}

export async function POST(request: NextRequest) {
  const body: HelloBody = await request.json();
  console.log("Received:", body.text);
  return NextResponse.json({ ok: true });
}
