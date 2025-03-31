'use client';

import { useEffect, useState } from 'react';
import styles from './VisitorStats.module.css';

export default function VisitorStats() {
  const [stats, setStats] = useState<{ ip: string; userAgent: string; referrer: string | null } | null>(null);

  useEffect(() => {
    // Simulação: no real seria uma chamada para API ou uso de cookies/contexto
    setStats({
      ip: '192.168.0.1',
      userAgent: window.navigator.userAgent,
      referrer: document.referrer || null,
    });
  }, []);

  if (!stats) return null;

  return (
    <div className={styles.container}>
      <h2>Estatísticas do Visitante</h2>
      <p><strong>IP:</strong> {stats.ip}</p>
      <p><strong>User Agent:</strong> {stats.userAgent}</p>
      <p><strong>Referência:</strong> {stats.referrer || 'Nenhuma'}</p>
    </div>
  );
}
