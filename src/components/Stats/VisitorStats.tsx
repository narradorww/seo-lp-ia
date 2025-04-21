'use client';

import styles from './VisitorStats.module.css';
import { useTrackVisitor } from '@/hooks/useTrackVisitor';
import Link from 'next/link';

export default function VisitorStats() {
  const { visitor } = useTrackVisitor();

  if (!visitor) {
    return <div className={styles.container}>Carregando...</div>;
  }

  const { ip, userAgent, referrer, geo } = visitor;

  return (
    <div className={styles.container}>
      <h3>Estatísticas do Visitante</h3>
      <p><strong>IP:</strong> {ip || 'Desconhecido'}</p>
      <p><strong>User Agent:</strong> {userAgent || 'Desconhecido'}</p>
      <p><strong>Referência:</strong> {referrer || 'Nenhuma'}</p>

      {geo && (
        <>
          <p><strong>Localização:</strong> {geo.city || '–'}, {geo.region || '–'}, {geo.country || '–'}</p>
          <p><strong>Latitude:</strong> {geo.latitude ?? '–'}</p>
          <p><strong>Longitude:</strong> {geo.longitude ?? '–'}</p>
        </>
      )}

      <Link href="/dashboard" className={styles.dashboardButton}>
        Ver no Mapa 🌍
      </Link>
    </div>
  );
}
