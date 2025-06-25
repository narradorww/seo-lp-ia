'use client';

import { useState, useEffect } from 'react';
import { MapPin, Users, Eye, BarChart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTrackVisitor } from '@/hooks/useTrackVisitor';
import styles from './VisitorStats.module.css';
import { useModal } from '@/contexts/ModalContext';

export default function VisitorStats() {
  const { visitor } = useTrackVisitor();
  const [isVisible, setIsVisible] = useState(true);
  const [visitorCount, setVisitorCount] = useState(0);
  const [totalVisits, setTotalVisits] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { open } = useModal();
  

  const handleEnrichmentSubmit = async (input: string, structuredData?: any) => {
    try {
      await fetch('/api/visitor/enrich', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          enrichment: input,
          structuredEnrichment: structuredData 
        }),
      });
      // opcional: feedback visual ou redirecionar
      window.location.href = '/dashboard';
    } catch (err) {
      console.error('[enrich] erro:', err);
    }
  };

  // Função para buscar estatísticas de visitantes
  const fetchVisitorStats = async () => {
    try {
      const response = await fetch('/api/stats');
      
      if (!response.ok) {
        throw new Error(`Stats API failed: ${response.status} ${response.statusText}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Expected JSON but got:', contentType, 'Response:', text.substring(0, 200));
        throw new Error('Invalid response format');
      }
      
      const data = await response.json();
      
      if (data.stats) {
        // Total de visitantes únicos
        setTotalVisits(data.stats.totalVisitors || 0);
        
        // Estimativa de visitantes ativos (cerca de 5-10% dos visitantes únicos)
        // Em um sistema real, isso seria calculado com base em sessões ativas
        const activeVisitors = Math.max(1, Math.floor((data.stats.uniqueVisitors || 0) * 0.08));
        setVisitorCount(activeVisitors);
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
      // Valores fallback em caso de erro
      setTotalVisits(145);
      setVisitorCount(1);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Buscar estatísticas iniciais
    fetchVisitorStats();
    
    // Atualizar estatísticas periodicamente
    const interval = setInterval(() => {
      fetchVisitorStats();
    }, 60000); // Atualizar a cada minuto

    return () => clearInterval(interval);
  }, []);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  if (!visitor) {
    return null;
  }

  const { ip, referrer, geo } = visitor;

  return (
    <div
      className={`fixed right-6 bottom-6 z-40 transition-all duration-300 ${isVisible ? styles.expanded : styles.minimized} ${styles.container}`}
    >
      <button
        onClick={toggleVisibility}
        className={styles.toggleButton}
        aria-label="Toggle Visitor Stats"
      >
        {isVisible ? <ChevronRight size={16} className={styles.toggleIcon} /> : <ChevronLeft size={16} className={styles.toggleIcon} />}
      </button>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <Eye size={16} className={styles.icon} />
          <h3>Visitor Statistics</h3>
        </div>

        <div className={styles.section}>
          <span className={styles.label}>Your IP Address</span>
          <span className={styles.value}>{ip || 'Desconhecido'}</span>
        </div>

        <div className={styles.section}>
          <span className={styles.label}><MapPin size={14} className={styles.iconSmall} /> Your Location</span>
          <span className={styles.value}>{geo?.city || '–'}, {geo?.country || '–'}</span>
        </div>

        <div className={styles.section}>
          <span className={styles.label}>Referral Source</span>
          <span className={styles.value} title={referrer || ''}>{referrer || 'Direct Visit'}</span>
        </div>

        {isLoading ? (
          <div className={styles.loading}>Carregando estatísticas...</div>
        ) : (
          <>
            <div className={styles.sectionRow}>
              <div className={styles.sectionLeft}><Users size={14} className={styles.iconSmall} /> Current Visitors</div>
              <div className={styles.value}>{visitorCount}</div>
            </div>

            <div className={styles.sectionRow}>
              <div className={styles.sectionLeft}><Eye size={14} className={styles.iconSmall} /> Total Visits</div>
              <div className={styles.value}>{totalVisits.toLocaleString()}</div>
            </div>
          </>
        )}

        <a onClick={() => open(handleEnrichmentSubmit)} className={styles.dashboardButton}>
          Improve your score & see your location 🌍
        </a>
      </div>
    </div>
  );
}
