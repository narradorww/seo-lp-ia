'use client';

import { useState } from 'react';
import styles from './VisitorSummary.module.css';
import { Users, Eye } from 'lucide-react';

interface VisitorSummaryProps {
  totalVisitors: number;
  uniqueVisitors: number;
  currentVisitors?: number;
}

export default function VisitorSummary({ 
  totalVisitors, 
  uniqueVisitors, 
  currentVisitors = Math.floor(uniqueVisitors * 0.1) // Default estimativa se não fornecido
}: VisitorSummaryProps) {
  
  return (
    <div className={styles.container}>
      <h3 className={styles.header}>Resumo de Visitas</h3>
      
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Eye size={20} />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{totalVisitors.toLocaleString()}</div>
            <div className={styles.statLabel}>Total de Visitas</div>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Users size={20} />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{uniqueVisitors.toLocaleString()}</div>
            <div className={styles.statLabel}>Visitantes Únicos</div>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Users size={20} />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{currentVisitors}</div>
            <div className={styles.statLabel}>Visitantes Atuais</div>
          </div>
        </div>
      </div>
    </div>
  );
}