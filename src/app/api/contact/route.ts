// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import { portfolioData } from "@/data/portfolio";

// Where the messages are delivered. With Resend's free test sender
// (onboarding@resend.dev) this MUST be the email you signed up to Resend with.
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || portfolioData.personal.email;

const RATE_LIMIT = 5; // messages allowed per IP...
const WINDOW_MS = 10 * 60 * 1000; // ...in 10 minutes
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

// Stop visitors from injecting HTML into the email
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, botCheck } = body;

    // Spam protection check (honeypot field)
    if (botCheck) {
      return NextResponse.json(
        { success: false, message: "Spam detected." },
        { status: 400 }
      );
    }

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !message.trim()
    ) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    if (name.length > 100 || email.length > 200 || message.length > 3000) {
      return NextResponse.json(
        { success: false, message: "Your message is too long." },
        { status: 400 }
      );
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many messages. Please try again in a few minutes.",
        },
        { status: 429 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is missing in .env.local");
      return NextResponse.json(
        {
          success: false,
          message:
            "The contact form is not available right now. Please email me directly.",
        },
        { status: 500 }
      );
    }

    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeMessage = escapeHtml(message.trim()).replace(/\n/g, "<br />");
    const subjectName = name.trim().replace(/[\r\n]+/g, " ").slice(0, 60);

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: [TO_EMAIL],
        reply_to: email.trim(), // hitting "Reply" in Gmail answers the visitor
        subject: `New portfolio message from ${subjectName}`,
        html: `
          <h2>New message from your portfolio</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Message:</strong></p>
          <p>${safeMessage}</p>
        `,
      }),
    });

    if (!res.ok) {
      console.error("Resend error:", res.status, await res.text());
      return NextResponse.json(
        {
          success: false,
          message: "Could not send your message. Please try again later.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Thank you! Your message has been sent successfully.",
    });
  } catch (error) {
    console.error("Contact route error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}