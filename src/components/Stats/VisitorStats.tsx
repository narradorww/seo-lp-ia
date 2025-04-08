'use client';

import { useEffect, useState } from 'react';
import styles from './VisitorStats.module.css';
import { VisitorInfo } from '@/types/visitor';


export default function VisitorStats() {
  const [stats, setStats] = useState<VisitorInfo | null>(null);

  useEffect(() => {
    fetch('/api/visitor')
      .then((res) => res.json())
      .then((data: VisitorInfo) => {
        console.log('[DEBUG] Visitor info:', data);
        setStats(data);

        fetch('/api/notify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
      });
  }, []);

  if (!stats) return null;

  return (
    <div className={styles.container}>
      <h3>Estatísticas do Visitante</h3>
      <p><strong>IP:</strong> {stats.ip}</p>
      <p><strong>User Agent:</strong> {stats.userAgent}</p>
      <p><strong>Referência:</strong> {stats.referrer || 'Nenhuma'}</p>

      {stats.geo && (
        <>
          <p><strong>Localização:</strong> {stats.geo.city}, {stats.geo.region}, {stats.geo.country_name}</p>
          <p><strong>Latitude:</strong> {stats.geo.latitude}</p>
          <p><strong>Longitude:</strong> {stats.geo.longitude}</p>
          <p><strong>Organização:</strong> {stats.geo.org}</p>
        </>
      )}
    </div>
  );
}
