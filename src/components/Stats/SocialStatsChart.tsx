'use client';

import React, { useState } from 'react';
import styles from './SocialStatsChart.module.css';
import { Share2, BarChart2, Check } from 'lucide-react';

interface SocialData {
  source: string;
  count: number;
  avgScore: number;
}

interface SocialStatsChartProps {
  data: SocialData[];
}

export default function SocialStatsChart({ data }: SocialStatsChartProps) {
  const [viewMode, setViewMode] = useState<'count' | 'score'>('count');
  
  // Determinar o valor máximo para escala do gráfico
  const maxValue = Math.max(
    ...data.map(item => viewMode === 'count' ? item.count : item.avgScore)
  );

  // Ordenar dados com base no critério selecionado
  const sortedData = [...data].sort((a, b) => 
    viewMode === 'count' 
      ? b.count - a.count 
      : b.avgScore - a.avgScore
  );

  // Função para obter o ícone adequado para cada rede social
  const getSocialIcon = (source: string) => {
    const name = source.toLowerCase();
    
    switch(name) {
      case 'linkedin':
        return '🔗';
      case 'github':
        return '👨‍💻';
      case 'twitter':
        return '🐦';
      case 'instagram':
        return '📸';
      case 'facebook':
        return '👤';
      case 'google':
        return '🔍';
      default:
        return '🌐';
    }
  };

  // Função para obter a cor da barra para cada rede social
  const getBarColor = (source: string) => {
    const name = source.toLowerCase();
    
    switch(name) {
      case 'linkedin':
        return '#0077b5';
      case 'github':
        return '#6e5494';
      case 'twitter':
        return '#1da1f2';
      case 'instagram':
        return '#e1306c';
      case 'facebook':
        return '#4267B2';
      case 'google':
        return '#4285F4';
      default:
        return 'var(--accent)';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <Share2 size={18} className={styles.titleIcon} />
          <h3>Redes Sociais & Referrers</h3>
        </div>
        
        <div className={styles.viewOptions}>
          <button 
            className={`${styles.viewButton} ${viewMode === 'count' ? styles.active : ''}`}
            onClick={() => setViewMode('count')}
            aria-label="Ver por visitas"
          >
            <BarChart2 size={16} />
            <span>Visitas</span>
          </button>
          <button 
            className={`${styles.viewButton} ${viewMode === 'score' ? styles.active : ''}`}
            onClick={() => setViewMode('score')}
            aria-label="Ver por score"
          >
            <Check size={16} />
            <span>Score</span>
          </button>
        </div>
      </div>

      <div className={styles.chartContainer}>
        {sortedData.map((item) => {
          const value = viewMode === 'count' ? item.count : item.avgScore;
          const percentage = (value / maxValue) * 100;
          
          return (
            <div key={item.source} className={styles.chartRow}>
              <div className={styles.sourceInfo}>
                <span className={styles.sourceIcon}>{getSocialIcon(item.source)}</span>
                <span className={styles.sourceName}>{item.source}</span>
              </div>
              <div className={styles.barContainer}>
                <div 
                  className={styles.bar} 
                  style={{ 
                    width: `${percentage}%`,
                    backgroundColor: getBarColor(item.source)
                  }}
                ></div>
                <span className={styles.value}>
                  {viewMode === 'count' 
                    ? item.count 
                    : `Score: ${item.avgScore}`
                  }
                </span>
              </div>
            </div>
          );
        })}

        {data.length === 0 && (
          <div className={styles.noData}>
            Nenhum dado disponível
          </div>
        )}
      </div>
    </div>
  );
}