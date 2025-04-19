// Edge runtime = menor latência + Geo/IP prontos na Vercel
export const runtime = 'edge';

import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

// helpers só existem quando a build roda NA Vercel
let ipAddress: typeof import('@vercel/functions').ipAddress | undefined;
let geolocation: typeof import('@vercel/functions').geolocation | undefined;

if (process.env.VERCEL) {
  // importa dinamicamente p/ evitar erro em dev
  ({ ipAddress, geolocation } = await import('@vercel/functions'));
}

export async function GET(request: Request) {
  /** 1️⃣ dados base, sempre disponíveis */
  const h = await headers();
  const userAgent = h.get('user-agent') ?? '';
  const referrer  = h.get('referer') ?? '';

  let ip    = 'desconhecido';
  let geo: import('@vercel/functions').Geo | undefined;

  /** 2️⃣ produção na Vercel – usa headers oficiais */
  if (process.env.VERCEL && ipAddress && geolocation) {
    ip  = ipAddress(request) ??
          h.get('x-forwarded-for')?.split(',')[0] ??
          'desconhecido';
    geo = geolocation(request);               // { city, country, region, latitude, longitude … }
  }

  /** 3️⃣ fallback local (next dev / docker / outra cloud) */
  if (!process.env.VERCEL) {
    try {
      const ext = await fetch('https://ipapi.co/json/').then(r => r.json());
      ip  = ext.ip;
      geo = {
        city:      ext.city,
        region:    ext.region,
        country:   ext.country_name,
        latitude:  ext.latitude,
        longitude: ext.longitude,
        org:       ext.org,
      };
    } catch (err) {
      console.error('IP lookup failed:', err);
    }
  }

  return NextResponse.json(
    { ip, userAgent, referrer, geo },
    { headers: { 'Cache-Control': 'no-store' } }  // nunca cacheia
  );
}
