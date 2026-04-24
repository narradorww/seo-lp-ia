'use client';

import { useState } from 'react';
import styles from './CountryChart.module.css';

interface CountryData {
  country: string;
  count: number;
  avgScore: number;
}

interface CountryChartProps {
  data: CountryData[];
}

export default function CountryChart({ data }: CountryChartProps) {
  const [sortBy, setSortBy] = useState<'count' | 'avgScore'>('count');
  
  // Encontrar o valor máximo para escala do gráfico
  const maxValue = Math.max(...data.map(item => 
    sortBy === 'count' ? item.count : item.avgScore
  ));

  // Ordenar dados com base no critério de ordenação
  const sortedData = [...data].sort((a, b) => 
    sortBy === 'count' 
      ? b.count - a.count 
      : b.avgScore - a.avgScore
  );

  const getFlag = (countryCode: string) => {
    // Converte códigos de 2 letras para emoji de bandeira
    if (countryCode.length === 2) {
      const offset = 127397; // Offset Unicode para converter letras em emojis de bandeira
      return String.fromCodePoint(...[...countryCode.toUpperCase()].map(c => c.charCodeAt(0) + offset));
    }
    
    // Mapeamento para países comuns
    const countryFlags: Record<string, string> = {
      'Brazil': '🇧🇷',
      'United States': '🇺🇸',
      'United Kingdom': '🇬🇧',
      'Canada': '🇨🇦',
      'Australia': '🇦🇺',
      'Japan': '🇯🇵',
      'China': '🇨🇳',
      'Germany': '🇩🇪',
      'France': '🇫🇷',
      'Italy': '🇮🇹',
      'Spain': '🇪🇸',
      'Portugal': '🇵🇹',
      'India': '🇮🇳',
      'Russia': '🇷🇺',
      'Mexico': '🇲🇽',
      'Argentina': '🇦🇷',
      'Chile': '🇨🇱',
      'Colombia': '🇨🇴',
      'Peru': '🇵🇪',
      'Venezuela': '🇻🇪',
      'Desconhecido': '🌐'
    };
    
    return countryFlags[countryCode] || '🌐';
  };

  // Gerar cores para as barras
  const getBarColor = (index: number) => {
    const colors = [
      'var(--primary)',
      'var(--accent)',
      '#6574cd',
      '#4dc0b5',
      '#f6993f',
      '#38c172',
      '#e3342f',
      '#ffed4a',
      '#9561e2',
      '#f66d9b'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Top Países</h3>
        <div className={styles.sortControls}>
          <button 
            className={`${styles.sortButton} ${sortBy === 'count' ? styles.active : ''}`}
            onClick={() => setSortBy('count')}
          >
            Por Visitas
          </button>
          <button 
            className={`${styles.sortButton} ${sortBy === 'avgScore' ? styles.active : ''}`}
            onClick={() => setSortBy('avgScore')}
          >
            Por Score
          </button>
        </div>
      </div>

      <div className={styles.chartContainer}>
        {sortedData.map((item, index) => {
          const value = sortBy === 'count' ? item.count : item.avgScore;
          const percentage = (value / maxValue) * 100;
          
          return (
            <div key={item.country} className={styles.chartRow}>
              <div className={styles.countryInfo}>
                <span className={styles.flag}>{getFlag(item.country)}</span>
                <span className={styles.countryName}>
                  {item.country}
                </span>
              </div>
              <div className={styles.barContainer}>
                <div 
                  className={styles.bar} 
                  style={{ 
                    width: `${percentage}%`,
                    backgroundColor: getBarColor(index)
                  }}
                ></div>
                <span className={styles.value}>
                  {sortBy === 'count' 
                    ? `${item.count} visitas` 
                    : `Score: ${item.avgScore}`}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}