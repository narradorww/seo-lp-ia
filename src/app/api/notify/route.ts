import { VisitorInfo } from '@/types/visitor';
import { NextRequest } from 'next/server';
import { Resend } from 'resend';


const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const data: VisitorInfo = await req.json();

  try {
    const response = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'noreply@yourdomain.com',
      to: process.env.EMAIL_TO || 'admin@yourdomain.com',
      subject: 'Nova visita na landing page',
      text: `
        IP: ${data.ip}
        User Agent: ${data.userAgent}
        Referrer: ${data.referrer || 'Nenhuma'}

        Localização: ${data.geo?.city}, ${data.geo?.region}, ${data.geo?.country_name}
        Latitude: ${data.geo?.latitude}
        Longitude: ${data.geo?.longitude}
        Organização: ${data.geo?.org}
      `,
    });

    return new Response(JSON.stringify({ success: true, response }), { status: 200 });
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
  return new Response(JSON.stringify({ error: 'Falha ao enviar e-mail' }), {
    status: 500,
  });
}
