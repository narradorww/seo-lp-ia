'use client';

import styles from './AchievementsSection.module.css';
import { Trophy, Star } from 'lucide-react';

interface Achievement {
  title: string;
  event: string;
  project: string;
  description: string;
  year: number;
  icon: 'trophy' | 'star';
}

const achievements: Achievement[] = [
  {
    title: "1st Place",
    event: "Hack for Change 2023 (Alura + FIAP)",
    project: "RecicleLink",
    description: "Created an innovative platform that uses AI to optimize recycling cooperative operations, winning against hundreds of competing teams.",
    year: 2023,
    icon: "trophy"
  },
  {
    title: "6th Place",
    event: "AI Immersion 2024 (Alura + Google)",
    project: "\"Scooby-Doo, Where Are You?\"",
    description: "Developed an AI-powered solution for locating lost pets during natural disasters, standing out among 1200+ projects.",
    year: 2023,
    icon: "star"
  }
];

export default function AchievementsSection() {
  return (
    <section id="achievements" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>
          Awards & <span className={styles.highlight}>Achievements</span>
        </h2>
        <p className={styles.description}>
          Recognition for innovative solutions and technical excellence in competitive tech challenges.
        </p>

        <div className={styles.achievementList}>
          {achievements.map((achievement, index) => (
            <div key={index} className={styles.achievementCard}>
              <div className={styles.achievementHeader}>
                <div className={styles.iconWrapper}>
                  {achievement.icon === "trophy" ? (
                    <Trophy className={styles.icon} />
                  ) : (
                    <Star className={styles.icon} />
                  )}
                </div>
                <div className={styles.headerText}>
                  <h3 className={styles.achievementTitle}>{achievement.title}</h3>
                  <p className={styles.event}>{achievement.event}</p>
                </div>
                <div className={styles.year}>{achievement.year}</div>
              </div>

              <h4 className={styles.project}>Project: {achievement.project}</h4>
              <p className={styles.text}>{achievement.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
