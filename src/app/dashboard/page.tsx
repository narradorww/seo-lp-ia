'use client'

import dynamic from 'next/dynamic';
import { generateFAQStructuredData } from '@/utils/structuredData';
import { useEffect, useState } from 'react';
import styles from './Dashboard.module.css';
import { Loader } from '@/components/common/Loader';
import Header from '@/components/Layout/Header';
import CountryChart from '@/components/Stats/CountryChart';
import VisitorSummary from '@/components/Stats/VisitorSummary';
import OsStatsChart from '@/components/Stats/OsStatsChart';
import SocialStatsChart from '@/components/Stats/SocialStatsChart';

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

interface OsData {
  name: string;
  count: number;
  avgScore: number;
}

interface SocialData {
  source: string;
  count: number;
  avgScore: number;
}

interface EnrichmentData {
  platform: string;
  count: number;
}

interface DashboardData {
  locations: VisitorGeo[];
  countrySummary: CountryData[];
  osSummary: OsData[];
  referralSummary: SocialData[];
  enrichmentSummary: EnrichmentData[];
  stats: {
    totalVisitors: number;
    uniqueVisitors: number;
  };
}

export default function DashboardPage() {
  const faqStructuredData = generateFAQStructuredData();
  
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    locations: [],
    countrySummary: [],
    osSummary: [],
    referralSummary: [],
    enrichmentSummary: [],
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData),
        }}
      />
      <Header />
      <main className={styles.dashboardWrapper}>
        <header>
          <h1 className={styles.title}>Visitor Analytics Dashboard</h1>
          <p className={styles.description}>Detailed analysis of visitors and their origins with geographic insights.</p>
        </header>
        
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
              <div className={styles.chartColumn}>
                <OsStatsChart data={dashboardData.osSummary} />
              </div>
            </div>
            
            <div className={styles.chartsGrid}>
              <div className={styles.chartColumn}>
                <SocialStatsChart data={dashboardData.referralSummary} />
              </div>
            </div>
            
            <section>
              <h2 className={styles.sectionTitle}>Geographic Distribution</h2>
              <p className={styles.sectionDescription}>Interactive map showing visitor locations worldwide.</p>
              <Map locations={dashboardData.locations} />
            </section>
            
            <section aria-labelledby="faq-heading">
              <h2 id="faq-heading" className={styles.sectionTitle}>Frequently Asked Questions</h2>
              <div className={styles.faqContainer}>
                <details className={styles.faqItem}>
                  <summary>What technologies does Rodrigo Alexandre specialize in?</summary>
                  <p>Rodrigo Alexandre specializes in JavaScript, TypeScript, React Native, React.js, Next.js, Node.js, MongoDB, AWS, and Generative AI solutions for mobile and web development.</p>
                </details>
                <details className={styles.faqItem}>
                  <summary>What awards has Rodrigo Alexandre received?</summary>
                  <p>Rodrigo has received awards from Google, Alura, and FIAP for innovative AI projects focusing on sustainability and image recognition solutions.</p>
                </details>
                <details className={styles.faqItem}>
                  <summary>How many years of experience does Rodrigo Alexandre have?</summary>
                  <p>Rodrigo Alexandre has over 20 years of experience in technology and more than 3 years focused specifically on software development, with expertise in mobile development and team leadership.</p>
                </details>
                <details className={styles.faqItem}>
                  <summary>What services does Rodrigo Alexandre offer?</summary>
                  <p>Rodrigo offers mobile app development, full-stack web development, AI integration, team leadership, code quality improvement, and technical consulting services.</p>
                </details>
              </div>
            </section>
          </>
        )}
      </main>
    </>
  );
}
