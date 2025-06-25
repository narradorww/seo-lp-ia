'use client';

import { useEffect, useState } from 'react';
import { UAParser } from 'ua-parser-js';

interface VisitorGeo {
  city?: string;
  region?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
}

interface VisitorData {
  ip: string;
  userAgent: string;
  referrer?: string;
  sistema_operacional: string;
  navegador: string;
  dispositivo: string;
  geo?: VisitorGeo;
  dataHora: Date;
}

export function useTrackVisitor() {
  const [visitor, setVisitor] = useState<VisitorData | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const track = async () => {
      try {
        // 1. Obtem IP e localização via Vercel Edge
        const geoRes = await fetch('/api/geo');
        
        if (!geoRes.ok) {
          throw new Error(`Geo API failed: ${geoRes.status} ${geoRes.statusText}`);
        }
        
        const contentType = geoRes.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await geoRes.text();
          throw new Error(`Expected JSON but got: ${contentType}. Response: ${text.substring(0, 100)}`);
        }
        
        const geoData = await geoRes.json();

        // 2. Extrai dados de navegação
        const ua = navigator.userAgent;
        const ref = document.referrer;
        const parser = new UAParser(ua);
        const parsed = parser.getResult();

        const payload: VisitorData = {
          ip: geoData.ip,
          geo: geoData.geo,
          userAgent: ua,
          referrer: ref,
          sistema_operacional: `${parsed.os.name} ${parsed.os.version}`,
          navegador: `${parsed.browser.name} ${parsed.browser.version}`,
          dispositivo: parsed.device.model || 'Desktop',
          dataHora: new Date()
        };

        // 3. Envia para backend
        await fetch('/api/visitor', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        setVisitor(payload);
      } catch (err) {
        console.error('[useTrackVisitor] erro:', err);
        setError(err as Error);
      }
    };

    track();
  }, []);

  return { visitor, error };
}
