import { NextResponse, type NextRequest } from "next/server";
import fs from "node:fs/promises";
type HelloBody = { text: string };

export async function GET(request: NextRequest) {
  try {
    const data: string = await fs.readFile("note.txt", { encoding: "utf8" });
    return NextResponse.json({ note: data });
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") {
      return NextResponse.json({ note: "No note yet" }, { status: 404 });
    }
    throw err;
  }
}

export async function POST(request: NextRequest) {
  const body: HelloBody = await request.json();
  console.log("Received:", body.text);
  await fs.writeFile("note.txt", body.text, "utf-8");
  return NextResponse.json({ ok: true });
}
