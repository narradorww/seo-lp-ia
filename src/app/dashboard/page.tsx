'use client'

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import styles from './Dashboard.module.css';
import { Loader } from '@/components/common/Loader';
import Header from '@/components/Layout/Header';


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

export default function DashboardPage() {
  const [locations, setLocations] = useState<VisitorGeo[]>([]);

  useEffect(() => {
    const fetchGeoPoints = async () => {
      const res = await fetch('/api/stats');
      const data = await res.json();
      setLocations(data.locations);
    };

    fetchGeoPoints();
  }, []);

  return (
    <>
      <Header />
      <div className={styles.dashboardWrapper}>
        <h1 className={styles.title}>Visitas no Mapa</h1>
        <p className={styles.description}>Veja de onde vieram os acessos ao site nas últimas horas.</p>
        <Map locations={locations} />
      </div>
    </>
  );
} 
