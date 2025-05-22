'use client';

import React, { useState } from 'react';
import styles from './OsStatsChart.module.css';
import { MonitorSmartphone, BarChart2, Check } from 'lucide-react';

interface OsData {
  name: string;
  count: number;
  avgScore: number;
}

interface OsStatsChartProps {
  data: OsData[];
}

export default function OsStatsChart({ data }: OsStatsChartProps) {
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

  // Função para obter o ícone adequado para cada sistema operacional
  const getOsIcon = (osName: string) => {
    const name = osName.toLowerCase();
    
    if (name.includes('windows')) {
      return '🪟';
    } else if (name.includes('mac') || name.includes('ios') || name.includes('iphone') || name.includes('ipad')) {
      return '🍎';
    } else if (name.includes('android')) {
      return '🤖';
    } else if (name.includes('linux')) {
      return '🐧';
    } else {
      return '💻';
    }
  };

  // Função para obter a cor da barra para cada sistema operacional
  const getBarColor = (osName: string) => {
    const name = osName.toLowerCase();
    
    if (name.includes('windows')) {
      return '#0078d7';
    } else if (name.includes('mac') || name.includes('ios') || name.includes('iphone') || name.includes('ipad')) {
      return '#ff375f';
    } else if (name.includes('android')) {
      return '#3ddc84';
    } else if (name.includes('linux')) {
      return '#ffd133';
    } else {
      return 'var(--primary)';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <MonitorSmartphone size={18} className={styles.titleIcon} />
          <h3>Sistemas Operacionais</h3>
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
            <div key={item.name} className={styles.chartRow}>
              <div className={styles.osInfo}>
                <span className={styles.osIcon}>{getOsIcon(item.name)}</span>
                <span className={styles.osName}>{item.name}</span>
              </div>
              <div className={styles.barContainer}>
                <div 
                  className={styles.bar} 
                  style={{ 
                    width: `${percentage}%`,
                    backgroundColor: getBarColor(item.name)
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