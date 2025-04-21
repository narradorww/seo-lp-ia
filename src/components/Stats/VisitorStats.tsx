'use client';

import { useEffect, useState } from 'react';
import styles from './VisitorStats.module.css';
import { VisitorInfo } from '@/types/visitor';

export default function VisitorStats() {
  const [stats, setStats] = useState<VisitorInfo | null>(null);

  useEffect(() => {
    const fetchVisitorData = async () => {
      try {
        const res = await fetch('/api/visitor', { method: 'POST' });
        const data: VisitorInfo = await res.json();

        if (!data || !data.ip) {
          console.warn('[VisitorStats] Nenhum dado retornado de /api/visitor');
          return;
        }

        console.log('[DEBUG] Visitor info:', data);
        setStats(data);

        await fetch('/api/notify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
      } catch (err) {
        console.error('[VisitorStats] Falha ao buscar dados do visitante:', err);
      }
    };

    fetchVisitorData();
  }, []);

  if (!stats) return null;

  const { ip, userAgent, referrer, geo } = stats;

  return (
    <div className={styles.container}>
      <h3>Estatísticas do Visitante</h3>
      <p><strong>IP:</strong> {ip || 'Desconhecido'}</p>
      <p><strong>User Agent:</strong> {userAgent || 'Desconhecido'}</p>
      <p><strong>Referência:</strong> {referrer || 'Nenhuma'}</p>

      {geo && (
        <>
          <p><strong>Localização:</strong> {geo.city || '–'}, {geo.region || '–'}, {geo.country_name || '–'}</p>
          <p><strong>Latitude:</strong> {geo.latitude ?? '–'}</p>
          <p><strong>Longitude:</strong> {geo.longitude ?? '–'}</p>
          <p><strong>Organização:</strong> {geo.org || '–'}</p>
        </>
      )}
    </div>
  );
}
