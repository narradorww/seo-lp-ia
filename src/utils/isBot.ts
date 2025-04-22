export function isBot(userAgent: string): boolean {
    if (!userAgent) return false;
  
    const botPatterns = [
      /bot/i,
      /crawler/i,
      /spider/i,
      /crawling/i,
      /curl/i,
      /wget/i,
      /python-requests/i,
      /node-fetch/i,
      /Go-http-client/i,
      /postmanruntime/i,
      /HeadlessChrome/i,
      /CCBot/i,            // Common Crawl
      /facebookexternalhit/i,
      /Slackbot/i,
      /WhatsApp/i
    ];
  
    return botPatterns.some((pattern) => pattern.test(userAgent));
  }
  