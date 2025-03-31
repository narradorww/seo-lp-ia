// src/app/api/visitor/route.ts

import { NextRequest } from 'next/server';
import axios from 'axios';
import { VisitorGeoData, VisitorInfo } from '@/types/visitor';


export async function GET(req: NextRequest) {
  const ipHeader = req.headers.get('x-forwarded-for');
  const ip = ipHeader?.split(',')[0].trim() || '8.8.8.8';

  try {
    const { data } = await axios.get<VisitorGeoData>(`https://ipapi.co/${ip}/json/`);

    const visitor: VisitorInfo = {
      ip,
      userAgent: req.headers.get('user-agent') || null,
      referrer: req.headers.get('referer') || null,
      geo: data,
    };

    return new Response(JSON.stringify(visitor), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.log('Erro ao obter dados do visitante:', error);
    return new Response(JSON.stringify({ error: 'Falha ao obter dados do visitante' }), {
      status: 500,
    });
  }
}
