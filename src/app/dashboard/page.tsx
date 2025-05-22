'use client'

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import styles from './Dashboard.module.css';
import { Loader } from '@/components/common/Loader';
import Header from '@/components/Layout/Header';
import CountryChart from '@/components/Stats/CountryChart';
import VisitorSummary from '@/components/Stats/VisitorSummary';

const Map = dynamic(() => import('@/components/Stats/VisitorMap'), {
  ssr: false,
  loading: () => <Loader />,
});

interface VisitorGeo {
  latitude: number;
  longitude: number;
  city?: string;
  region?: string;
  country?: string;
}

interface CountryData {
  country: string;
  count: number;
  avgScore: number;
}

interface DashboardData {
  locations: VisitorGeo[];
  countrySummary: CountryData[];
  stats: {
    totalVisitors: number;
    uniqueVisitors: number;
  };
}

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    locations: [],
    countrySummary: [],
    stats: {
      totalVisitors: 0,
      uniqueVisitors: 0
    }
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('/api/stats');
        const data = await res.json();
        setDashboardData(data);
      } catch (error) {
        console.error('Erro ao buscar dados do dashboard:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <>
      <Header />
      <div className={styles.dashboardWrapper}>
        <h1 className={styles.title}>Dashboard de Visitas</h1>
        <p className={styles.description}>Análise detalhada de visitantes e suas origens.</p>
        
        {isLoading ? (
          <div className={styles.loadingContainer}>
            <Loader />
          </div>
        ) : (
          <>
            <VisitorSummary 
              totalVisitors={dashboardData.stats.totalVisitors} 
              uniqueVisitors={dashboardData.stats.uniqueVisitors} 
            />
            
            <div className={styles.chartsGrid}>
              <div className={styles.chartColumn}>
                <CountryChart data={dashboardData.countrySummary} />
              </div>
            </div>
            
            <h2 className={styles.sectionTitle}>Visitas no Mapa</h2>
            <p className={styles.sectionDescription}>Distribuição geográfica dos visitantes.</p>
            <Map locations={dashboardData.locations} />
          </>
        )}
      </div>
    </>
  );
}
