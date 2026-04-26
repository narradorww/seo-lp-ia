import { NextRequest } from 'next/server';
import { streamText } from 'ai';
import { google } from '@ai-sdk/google';
import { readFileSync } from 'fs';
import { join } from 'path';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

function getPersona(): string {
  try {
    return readFileSync(join(process.cwd(), 'mirror-persona.md'), 'utf-8');
  } catch {
    return 'Você é o MirrorIA, digital twin de Rodrigo Alexandre, desenvolvedor React Native.';
  }
}

export async function POST(request: NextRequest) {
  const { messages } = await request.json() as { messages: ChatMessage[] };

  if (!messages?.length) {
    return new Response(JSON.stringify({ error: 'messages required' }), { status: 400 });
  }

  const result = streamText({
    model: google('gemini-2.0-flash'),
    system: getPersona(),
    messages,
    maxOutputTokens: 1024,
  });

  return result.toTextStreamResponse();
}
