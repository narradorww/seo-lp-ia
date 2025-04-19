export const runtime = 'edge';           // garante Edge Function

import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { ipAddress, geolocation } from '@vercel/edge'; // ✅ helpers corretos

export async function GET(request: Request) {
  const h = await headers();
  const userAgent = h.get('user-agent') ?? '';
  const referrer  = h.get('referer') ?? '';

  /* -------- Vercel prod -------- */
  let ip  = ipAddress(request) ?? 'desconhecido';
  let geo = geolocation(request);        // {} fora da Vercel ou sem header

  /* -------- fallback local -------- */
  if (!process.env.VERCEL || ip === 'desconhecido') {
    try {
      const ext = await fetch('https://ipapi.co/json/').then(r => r.json());
      ip  = ext.ip;
      geo = {
        city:      ext.city,
        region:    ext.region,
        country:   ext.country_name,
        latitude:  ext.latitude,
        longitude: ext.longitude
      };
    } catch (err) {
      console.error('[visitor] IP lookup failed:', err);
    }
  }

  return NextResponse.json(
    { ip, userAgent, referrer, geo },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}
