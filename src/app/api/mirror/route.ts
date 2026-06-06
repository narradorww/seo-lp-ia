import { NextRequest } from 'next/server';
import { streamText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { openai } from '@ai-sdk/openai';
import { google } from '@ai-sdk/google';
import { readFileSync } from 'fs';
import { join } from 'path';

export type Provider = 'anthropic' | 'openai' | 'google';

const MODELS: Record<Provider, ReturnType<typeof anthropic | typeof openai | typeof google>> = {
  anthropic: anthropic('claude-sonnet-4-6'),
  openai: openai('gpt-4o'),
  google: google('gemini-2.0-flash'),
};

function getPersona(): string {
  try {
    return readFileSync(join(process.cwd(), 'mirror-persona.md'), 'utf-8');
  } catch {
    return 'Você é o MirrorIA, digital twin de Rodrigo Alexandre, desenvolvedor React Native.';
  }
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function POST(request: NextRequest) {
  const { messages, provider = 'anthropic' } = await request.json() as {
    messages: ChatMessage[];
    provider?: Provider;
  };

  if (!messages?.length) {
    return new Response(JSON.stringify({ error: 'messages required' }), { status: 400 });
  }

  const model = MODELS[provider] ?? MODELS.anthropic;
  const persona = getPersona();

  const result = streamText({
    model,
    system: persona,
    messages,
    maxOutputTokens: 1024,
  });

  return result.toTextStreamResponse();
}
