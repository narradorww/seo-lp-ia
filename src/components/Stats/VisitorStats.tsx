'use client';

import { useState, useEffect } from 'react';
import { MapPin, Users, Eye, BarChart } from 'lucide-react';
import Link from 'next/link';
import { useTrackVisitor } from '@/hooks/useTrackVisitor';
import styles from './VisitorStats.module.css';
import LeadEnrichmentModal from '@/components/Stats/LeadEnrichmentModal';
import { useModal } from '@/contexts/ModalContext';

export default function VisitorStats() {
  const { visitor } = useTrackVisitor();
  const [isVisible, setIsVisible] = useState(true);
  const [visitorCount, setVisitorCount] = useState(1);
  const [totalVisits, setTotalVisits] = useState(145);
  const [showModal, setShowModal] = useState(false);
  const { open } = useModal();
  

  const handleEnrichmentSubmit = async (input: string) => {
    try {
      await fetch('/api/visitor/enrich', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enrichment: input }),
      });
      // opcional: feedback visual ou redirecionar
      window.location.href = '/dashboard';
    } catch (err) {
      console.error('[enrich] erro:', err);
    }
  };


  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setVisitorCount((prev) => prev + 1);
        setTotalVisits((prev) => prev + 1);
      }
    }, 30000);

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
      className={`fixed right-6 bottom-6 z-40 transition-transform duration-300 ${isVisible ? 'translate-x-0' : 'translate-x-[calc(100%-2rem)]'
        } ${styles.container}`}
    >
      <button
        onClick={toggleVisibility}
        className={styles.toggleButton}
        aria-label="Toggle Visitor Stats"
      >
        <BarChart size={16} className={styles.toggleIcon} />
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

        <div className={styles.sectionRow}>
          <div className={styles.sectionLeft}><Users size={14} className={styles.iconSmall} /> Current Visitors</div>
          <div className={styles.value}>{visitorCount}</div>
        </div>

        <div className={styles.sectionRow}>
          <div className={styles.sectionLeft}><Eye size={14} className={styles.iconSmall} /> Total Visits</div>
          <div className={styles.value}>{totalVisits.toLocaleString()}</div>
        </div>



        <a onClick={() => open(handleEnrichmentSubmit)} className={styles.dashboardButton}>
  Improve your score & see your location 🌍
</a>



      </div>
    </div>
  );
}
