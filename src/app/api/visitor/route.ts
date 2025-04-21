import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY as string);

interface VisitData {
  ip: string;
  userAgent: string;
  referrer?: string;
  geo?: {
    city?: string;
    region?: string;
    country?: string;
    latitude?: number;
    longitude?: number;
  };
  sistema_operacional: string;
  navegador: string;
  dispositivo: string;
  dataHora: Date;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      ip,
      userAgent,
      referrer,
      geo,
      sistema_operacional,
      navegador,
      dispositivo
    } = body;

    const visitData: VisitData = {
      ip,
      userAgent,
      referrer,
      geo,
      sistema_operacional,
      navegador,
      dispositivo,
      dataHora: new Date()
    };

    const client = await clientPromise;
    const db = client.db('visitTracker');
    await db.collection<VisitData>('visitas').insertOne(visitData);

    await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: process.env.EMAIL_TO!,
      subject: 'Nova visita registrada',
      html: `<pre>${JSON.stringify(visitData, null, 2)}</pre>`
    });

    return NextResponse.json({ status: 'ok' });
  } catch (err) {
    console.error('[visitor] erro no POST:', err);
    return NextResponse.json({ error: 'erro ao registrar visita' }, { status: 500 });
  }
}
