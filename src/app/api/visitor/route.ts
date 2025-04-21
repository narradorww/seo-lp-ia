import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import clientPromise from '@/lib/mongodb';
import {UAParser} from 'ua-parser-js';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY as string);

interface VisitData {
  ip: string;
  userAgent: string; // 👈 adicione isso aqui
  dataHora: Date;
  sistema_operacional: string;
  navegador: string;
  dispositivo: string;
  referrer?: string;
  geo?: {
    city?: string;
    region?: string;
    country?: string;
    latitude?: number;
    longitude?: number;
  };
  geoProcessado: boolean;
}


export async function POST(request: NextRequest) {
  const h = headers();
  const userAgent = (await h).get('user-agent') || '';
  const referrer = (await h).get('referer') || '';

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'IP desconhecido';


  let geo = {};

  // Obter geolocalização via ipapi.co diretamente
  try {
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    const ext = await response.json();
    geo = {
      city: ext.city,
      region: ext.region,
      country: ext.country_name,
      latitude: ext.latitude,
      longitude: ext.longitude,
    };
  } catch (err) {
    console.error('[visitor] IP lookup failed:', err);
  }

  const parser = new UAParser(userAgent);
  const uaResult = parser.getResult();

  const visitData: VisitData = {
    ip,
    dataHora: new Date(),
    sistema_operacional: `${uaResult.os.name || 'Desconhecido'} ${uaResult.os.version || ''}`.trim(),
    navegador: `${uaResult.browser.name || 'Desconhecido'} ${uaResult.browser.version || ''}`.trim(),
    dispositivo: uaResult.device.model || 'Desktop',
    referrer,
    userAgent,
    geo: geo,
    geoProcessado: true  
  };

  try {
    const client = await clientPromise;
    const db = client.db('visitTracker');

    await db.collection<VisitData>('visitas').insertOne(visitData);

    await resend.emails.send({
      from: 'Visitas <noreply@seudominio.com>',
      to: 'rodrigo.anst@gmail.com',
      subject: 'Nova visita registrada',
      html: `<pre>${JSON.stringify(visitData, null, 2)}</pre>`,
    });

    return NextResponse.json(visitData, { status: 200 });
  } catch (error) {
    console.error('Erro ao registrar visita:', error);
    return NextResponse.json({ error: 'Erro ao registrar visita' }, { status: 500 });
  }
}
