// src/app/api/chat/route.ts
import { NextResponse } from "next/server";
import { BOT_CONTEXT } from "@/lib/botContext";

// Models are tried in order. If the first one is rate-limited (429) or
// missing (404), the next one is used automatically.
// You can change them in .env.local with GROQ_MODEL.
const MODELS = [
  process.env.GROQ_MODEL || "openai/gpt-oss-20b",
  "openai/gpt-oss-120b",
];

const MAX_MESSAGES = 10; // only the last 10 messages are sent
const MAX_CHARS = 500; // max length of one message
const RATE_LIMIT = 15; // requests allowed per IP...
const WINDOW_MS = 10 * 60 * 1000; // ...in 10 minutes

// Simple in-memory limiter (best-effort; resets when the server restarts)
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

type ChatMessage = { role: "user" | "assistant"; content: string };

export async function POST(req: Request) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Chatbot is not configured yet." },
      { status: 500 }
    );
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many messages. Please try again in a few minutes." },
      { status: 429 }
    );
  }

  let body: { messages?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const raw = Array.isArray(body.messages) ? body.messages : [];
  const messages: ChatMessage[] = raw
    .filter(
      (m: any) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0
    )
    .slice(-MAX_MESSAGES)
    .map((m: any) => ({
      role: m.role as "user" | "assistant",
      content: String(m.content).slice(0, MAX_CHARS),
    }));

  // The conversation must start with a user message
  while (messages.length && messages[0].role !== "user") messages.shift();

  if (!messages.length || messages[messages.length - 1].role !== "user") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  let sawRateLimit = false;

  for (const model of MODELS) {
    try {
      const res = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model,
            messages: [{ role: "system", content: BOT_CONTEXT }, ...messages],
            max_tokens: 1024, // gpt-oss models use some tokens for reasoning
            temperature: 0.4,
          }),
        }
      );

      if (res.ok) {
        const data = await res.json();
        const reply: string =
          data?.choices?.[0]?.message?.content?.trim() ||
          "Sorry, I couldn't answer that. Please use the contact form to reach Kiran.";
        return NextResponse.json({ reply });
      }

      console.error(`Groq error (${model}):`, res.status, await res.text());

      if (res.status === 429) sawRateLimit = true;
      // On 429 / 404 / 5xx try the next model, otherwise stop
      if (![404, 429, 500, 502, 503].includes(res.status)) break;
    } catch (err) {
      console.error(`Chat route error (${model}):`, err);
    }
  }

  if (sawRateLimit) {
    return NextResponse.json(
      {
        error:
          "The chat limit for now is reached. Please try again later or use the contact form to reach Kiran.",
      },
      { status: 429 }
    );
  }

  return NextResponse.json(
    { error: "The assistant is busy right now. Please try again later." },
    { status: 502 }
  );
}