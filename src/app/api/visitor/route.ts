import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Resend } from 'resend';
import { calculateLeadScore } from '@/utils/calculateLeadScore';
import { isBot } from '@/utils/isBot';
import { resolveIpOrg } from '@/utils/resolveIpOrg';
import { VisitData } from '@/types/visitor';

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

    const score = calculateLeadScore(visitData);
    const botDetected = isBot(userAgent);
    
    // Resolve IP organization with timeout and fallback
    let ipOrg: string | null = null;
    try {
      // Add timeout to prevent hanging
      const orgPromise = resolveIpOrg(ip);
      const timeoutPromise = new Promise<null>((_, reject) => 
        setTimeout(() => reject(new Error('IP resolution timeout')), 8000)
      );
      
      ipOrg = await Promise.race([orgPromise, timeoutPromise]);
    } catch (err) {
      console.warn('[visitor] IP organization resolution failed:', err instanceof Error ? err.message : 'Unknown error');
      ipOrg = null;
    }

    const fullVisitData: VisitData = {
      ...visitData,
      ipOrg: ipOrg ?? undefined,
      isBot: botDetected,
      leadScore: score
    };

    const client = await clientPromise;
    const db = client.db('visitTracker');
    await db.collection<VisitData>('visitas').insertOne(fullVisitData);

    const result = await resend.emails.send({
      from: 'rodrigo@resend.dev',
      to: 'rodrigo.anst@gmail.com',
      subject: `🧭 Nova visita (score ${score})${botDetected ? ' 🤖 BOT' : ''}`,
      text: `Lead Score: ${score}\nTipo: ${botDetected ? 'BOT' : 'HUMANO'}\nOrg. IP: ${ipOrg ?? 'Desconhecida'}`,
      html: `
        <h3>Lead Score: ${score}</h3>
        <p><strong>Tipo:</strong> ${botDetected ? 'BOT' : 'HUMANO'}</p>
        <p><strong>Org. IP:</strong> ${ipOrg ?? 'Desconhecida'}</p>
        <pre>${JSON.stringify(fullVisitData, null, 2)}</pre>
      `
    });

    console.log('[resend result]', result);

if ('error' in result) {
  console.error('[resend] erro ao enviar e-mail:', result.error);
}

    return NextResponse.json({ status: 'ok' });
  } catch (err) {
    console.error('[visitor] erro no POST:', err);
    return NextResponse.json({ error: 'erro ao registrar visita' }, { status: 500 });
  }
}
