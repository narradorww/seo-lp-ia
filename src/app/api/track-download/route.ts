import { NextRequest } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY ?? 'placeholder');

interface DownloadData {
  fileName: string;
  downloadUrl: string;
  userAgent: string;
  ip: string;
  referrer?: string;
  timestamp: string;
}

export async function POST(req: NextRequest) {
  try {
    const data: DownloadData = await req.json();
    
    // Envia notificação por email
    const response = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'noreply@yourdomain.com',
      to: process.env.EMAIL_TO || 'admin@yourdomain.com',
      subject: '📱 Download de APK realizado - Internal Store',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0070f3;">🚀 Novo Download de APK</h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">📱 Arquivo Baixado</h3>
            <p><strong>Nome:</strong> ${data.fileName}</p>
            <p><strong>URL:</strong> <a href="${data.downloadUrl}">${data.downloadUrl}</a></p>
            <p><strong>Data/Hora:</strong> ${new Date(data.timestamp).toLocaleString('pt-BR')}</p>
          </div>
          
          <div style="background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1976d2;">👤 Informações do Usuário</h3>
            <p><strong>IP:</strong> ${data.ip}</p>
            <p><strong>User Agent:</strong> ${data.userAgent}</p>
            <p><strong>Referrer:</strong> ${data.referrer || 'Direto'}</p>
          </div>
          
          <div style="background: #fff3e0; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #f57c00;">📊 Ação Recomendada</h3>
            <p>• Verificar se o usuário é um lead qualificado</p>
            <p>• Acompanhar engajamento com o aplicativo</p>
            <p>• Considerar follow-up se apropriado</p>
          </div>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          
          <p style="font-size: 12px; color: #666; text-align: center;">
            Este email foi gerado automaticamente pelo sistema de analytics da Internal Store
          </p>
        </div>
      `,
      text: `
        🚀 Novo Download de APK - Internal Store
        
        📱 Arquivo Baixado:
        Nome: ${data.fileName}
        URL: ${data.downloadUrl}
        Data/Hora: ${new Date(data.timestamp).toLocaleString('pt-BR')}
        
        👤 Informações do Usuário:
        IP: ${data.ip}
        User Agent: ${data.userAgent}
        Referrer: ${data.referrer || 'Direto'}
        
        📊 Considere fazer follow-up com este lead potencial.
      `,
    });

    return new Response(JSON.stringify({ success: true, response }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Erro ao trackear download:', error);
    return new Response(JSON.stringify({ error: 'Falha ao trackear download' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}