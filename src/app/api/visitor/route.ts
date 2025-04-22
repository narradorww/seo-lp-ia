import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Resend } from 'resend';
import { calculateLeadScore } from '@/utils/calculateLeadScore';
import { isBot } from '@/utils/isBot';
import { VisitData } from '@/types/visitor';
import { resolveIpOrg } from '@/utils/resolveIpOrg';

const resend = new Resend(process.env.RESEND_API_KEY as string);



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

    const score = calculateLeadScore(visitData);
    const botDetected = isBot(visitData.userAgent);
    const ipOrg = await resolveIpOrg(visitData.ip);


const fullVisitData: VisitData = {
  ...visitData,
  ipOrg,
  isBot: botDetected,
};

await db.collection<VisitData>('visitas').insertOne(fullVisitData);


await resend.emails.send({
  from: process.env.EMAIL_FROM!,
  to: process.env.EMAIL_TO!,
  subject: `🧭 Nova visita (score ${score})${botDetected ? ' 🤖 BOT' : ''}`,
  text: `Lead Score: ${score}\nTipo: ${botDetected ? 'BOT' : 'HUMANO'}\nOrg. IP: ${ipOrg ?? 'Desconhecida'}`,
  html: `
    <h3>Lead Score: ${score}</h3>
    <p><strong>Tipo:</strong> ${botDetected ? 'BOT' : 'HUMANO'}</p>
    <p><strong>Org. IP:</strong> ${ipOrg ?? 'Desconhecida'}</p>
    <pre>${JSON.stringify(fullVisitData, null, 2)}</pre>
  `
});


    return NextResponse.json({ status: 'ok' });
  } catch (err) {
    console.error('[visitor] erro no POST:', err);
    return NextResponse.json({ error: 'erro ao registrar visita' }, { status: 500 });
  }
}
