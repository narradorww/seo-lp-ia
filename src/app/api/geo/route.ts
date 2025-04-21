export const runtime = 'edge';

import { NextRequest, NextResponse } from 'next/server';
import { geolocation } from '@vercel/edge';

export async function GET(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || 'IP desconhecido';
  const geo = geolocation(request); // cidade, país, etc. da Vercel

  return NextResponse.json({
    ip,
    geo,
    timestamp: new Date().toISOString()
  });
}
