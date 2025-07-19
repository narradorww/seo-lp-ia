'use client';

import { useEffect } from 'react';
import { UAParser } from 'ua-parser-js';

export function useTrackInternalStore() {
  useEffect(() => {
    const trackVisit = async () => {
      try {
        // Obtem dados de geo e IP
        const geoRes = await fetch('/api/geo');
        if (!geoRes.ok) return;
        
        const geoData = await geoRes.json();
        const parser = new UAParser(navigator.userAgent);
        const parsed = parser.getResult();

        // Payload especializado para Internal Store
        const payload = {
          ip: geoData.ip,
          geo: geoData.geo,
          userAgent: navigator.userAgent,
          referrer: document.referrer,
          sistema_operacional: `${parsed.os.name} ${parsed.os.version}`,
          navegador: `${parsed.browser.name} ${parsed.browser.version}`,
          dispositivo: parsed.device.model || 'Desktop',
          dataHora: new Date(),
          page: '/internal-store',
          action: 'page_visit'
        };

        // Salva visita normal
        await fetch('/api/visitor', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        // Notifica por email sobre acesso à store interna (ALTA PRIORIDADE)
        await fetch('/api/notify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...payload,
            subject: '🚨 LEAD QUENTE: Acesso à Internal Store (Score: 100+)',
            message: `
              🏪 ALTA PRIORIDADE: Usuário acessou Internal Store
              
              ⚡ Score Automático: 100+ pontos (equivale a recruiter)
              📱 Interesse confirmado em tecnologia e aplicativos
              🎯 Lead qualificado para contato imediato
              
              IP: ${payload.ip}
              Local: ${payload.geo?.city}, ${payload.geo?.country}
              Dispositivo: ${payload.dispositivo}
              Navegador: ${payload.navegador}
              
              💡 AÇÃO RECOMENDADA: Contato prioritário para oportunidades.
            `
          })
        });

      } catch (error) {
        console.error('Erro ao trackear visita na Internal Store:', error);
      }
    };

    trackVisit();
  }, []);
}

export function trackDownload(fileName: string, downloadUrl: string) {
  return async () => {
    try {
      const geoRes = await fetch('/api/geo');
      if (!geoRes.ok) return;
      
      const geoData = await geoRes.json();

      const downloadData = {
        fileName,
        downloadUrl,
        userAgent: navigator.userAgent,
        ip: geoData.ip,
        referrer: document.referrer,
        timestamp: new Date().toISOString(),
        action: 'apk_download',
        page: '/internal-store'
      };

      // Trackear o download (notificação prioritária)
      await fetch('/api/track-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(downloadData)
      });

      // Também salvar como visita especial no banco
      await fetch('/api/visitor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...downloadData,
          sistema_operacional: 'Mobile Download',
          navegador: navigator.userAgent,
          dispositivo: 'APK Download',
          dataHora: new Date(),
          geo: geoData.geo
        })
      });

      console.log(`Download trackado: ${fileName}`);
    } catch (error) {
      console.error('Erro ao trackear download:', error);
    }
  };
}