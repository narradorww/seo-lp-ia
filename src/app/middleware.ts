import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") || "";
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const path = request.nextUrl.pathname;

  const isBot = /bot|crawl|spider|slurp|facebook|whatsapp|google|linkedin/i.test(userAgent);

  if (isBot && process.env.LOGSNAG_API_KEY) {
    fetch("https://api.logsnag.com/v1/log", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.LOGSNAG_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        project: "seo-portfolio",
        channel: "bots",
        event: "Bot acessou",
        description: `Bot: ${userAgent}\nPath: ${path}\nIP: ${ip}`,
        icon: "🕷️",
        notify: false,
      }),
    });
  }

  return NextResponse.next();
}
