import Header from '@components/Layout/Header';
import Footer from '@components/Layout/Footer';
import HeroSection from '@components/HeroSection/HeroSection';
import VisitorStats from '@components/Stats/VisitorStats';
import styles from './page.module.css';
import CookieNotice from '@/components/Layout/CookieNotice';
import ProfileSection from '@/components/Portfolio/ProfileSection';
import ProjectsSection from '@/components/ProjectsSection/ProjectSection';
import AchievementsSection from '@/components/AchievementsSection/AchievementsSection';
import { generatePersonStructuredData } from '@/utils/structuredData';

export default function LandingPage() {
  const structuredData = generatePersonStructuredData();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <div className={styles.container}>
        <Header />
        <HeroSection />

        <main className={styles.mainContent}>
          <ProfileSection />
          <ProjectsSection />
          <AchievementsSection />
        </main>

        <VisitorStats />
        <Footer />
        <CookieNotice />
      </div>
    </>
  );
}
