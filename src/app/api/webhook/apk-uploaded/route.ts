import { NextRequest } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface APKWebhookData {
  fileName: string;
  version: string;
  size: string;
  downloadUrl: string;
  buildNumber: string;
  commitMessage: string;
  timestamp: string;
}

export async function POST(req: NextRequest) {
  try {
    const data: APKWebhookData = await req.json();
    
    // Verificar se tem autorização (opcional - adicionar header de segurança)
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.WEBHOOK_SECRET}`) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Envia notificação por email sobre novo APK
    const response = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'noreply@yourdomain.com',
      to: process.env.EMAIL_TO || 'admin@yourdomain.com',
      subject: '🚀 APK Automaticamente Publicado na Internal Store!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0070f3, #f5a623); color: white; padding: 25px; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">📱 Novo APK Deployado!</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">TaskManager CI/CD publicou automaticamente uma nova versão</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 25px;">
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #0070f3;">
              <h2 style="margin-top: 0; color: #333;">📦 Informações do APK</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; font-weight: bold;">📁 Arquivo:</td><td>${data.fileName}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">🏷️ Versão:</td><td>${data.version}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">📏 Tamanho:</td><td>${data.size}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">🔢 Build:</td><td>#${data.buildNumber}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">🕒 Data:</td><td>${new Date(data.timestamp).toLocaleString('pt-BR')}</td></tr>
              </table>
            </div>
            
            <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="margin-top: 0; color: #2e7d32;">💬 Commit Message</h3>
              <p style="margin: 0; font-family: monospace; font-size: 14px;">${data.commitMessage}</p>
            </div>
            
            <div style="text-align: center; margin: 25px 0;">
              <a href="${data.downloadUrl}" 
                 style="display: inline-block; background: #0070f3; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 0 10px;">
                📱 Download APK
              </a>
              <br><br>
              <a href="https://rodrigoalexandre.com/internal-store" 
                 style="display: inline-block; background: #f5a623; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 0 10px;">
                🏪 Ver Internal Store
              </a>
            </div>
            
            <div style="background: #fff3e0; padding: 20px; border-radius: 8px;">
              <h3 style="margin-top: 0; color: #f57c00;">🎯 Status do Sistema</h3>
              <ul style="margin: 0; padding-left: 20px;">
                <li>✅ APK disponível para download</li>
                <li>📊 Tracking de analytics ativado</li>
                <li>🔔 Notificações de leads configuradas</li>
                <li>📱 QR Code gerado automaticamente</li>
                <li>🚨 Score premium (100+) para visitantes</li>
              </ul>
            </div>
          </div>
          
          <div style="background: #333; color: #ccc; padding: 20px; text-align: center; border-radius: 0 0 8px 8px;">
            <p style="margin: 0; font-size: 12px;">🤖 Notificação automática do TaskManager CI/CD</p>
            <p style="margin: 5px 0 0 0; font-size: 12px;">Build: #${data.buildNumber} | Sistema: Internal Store</p>
          </div>
        </div>
      `,
      text: `
        🚀 Novo APK Publicado na Internal Store!
        
        📦 Detalhes:
        - Arquivo: ${data.fileName}
        - Versão: ${data.version}
        - Tamanho: ${data.size}
        - Build: #${data.buildNumber}
        - Data: ${new Date(data.timestamp).toLocaleString('pt-BR')}
        
        💬 Commit: ${data.commitMessage}
        
        🔗 Links:
        - Download: ${data.downloadUrl}
        - Internal Store: https://rodrigoalexandre.com/internal-store
        
        ✅ Sistema ativo: Analytics, QR codes e tracking de leads funcionando!
      `,
    });

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'APK upload notification sent',
      response 
    }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Erro ao processar webhook de APK:', error);
    return new Response(JSON.stringify({ error: 'Falha ao processar webhook' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}