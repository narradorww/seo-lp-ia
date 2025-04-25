// src/components/Profile/ProfileSection.tsx
'use client';

import Badge from '../common/Badge';
import styles from './ProfileSection.module.css';
;
import { Code, Rocket, Users } from 'lucide-react';

const skills = [
  'JavaScript', 'TypeScript', 'React Native', 'React.js',
  'Next.js', 'Node.js', 'MongoDB', 'AWS', 'Generative AI', 'Agile', 'Scrum'
];

export default function ProfileSection() {
  return (
    <section id="profile" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>
          Professional <span className={styles.highlight}>Profile</span>
        </h2>

        <div className={styles.columns}>
          {/* Technical Expertise */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <Code size={24} />
              <h3>Technical Expertise</h3>
            </div>
            <p className={styles.text}>
              Expert in JavaScript/TypeScript with strong focus on mobile development using React Native.
              Full-stack capabilities with experience in React.js, Next.js, Node.js, MongoDB, and AWS.
            </p>
            <div className={styles.badgeList}>
              {skills.map(skill => (
                <Badge key={skill}>{skill}</Badge>
              ))}
            </div>
          </div>

          {/* Team Leadership */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <Users size={24} />
              <h3>Team Leadership</h3>
            </div>
            <p className={styles.text}>
              Led agile development teams following Scrum methodologies.
              Strong record of improving developer experience and implementing efficient workflows with Jira.
            </p>
            <ul className={styles.list}>
              <li>Agile team management</li>
              <li>Scrum implementation</li>
              <li>Workflow optimization</li>
              <li>Code quality improvement</li>
              <li>Mentorship and knowledge sharing</li>
            </ul>
          </div>

          {/* Innovation Focus */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <Rocket size={24} />
              <h3>Innovation Focus</h3>
            </div>
            <p className={styles.text}>
              Passionate about applying cutting-edge technologies to solve real-world problems.
              Special interest in Generative AI applications and their integration into mobile development.
            </p>
            <ul className={styles.list}>
              <li>Award-winning AI projects</li>
              <li>Sustainability solutions</li>
              <li>Efficiency optimization</li>
              <li>UX enhancement through AI</li>
              <li>Continuous learning mindset</li>
            </ul>
          </div>
        </div>

        {/* Professional Journey */}
        <div className={styles.journeyCard}>
          <h3>Professional Journey</h3>
          <p>
            With over 20 years in technology and more than 3 years focused on software development,
            I've led impactful projects across various industries. My expertise lies in crafting
            efficient, user-friendly mobile experiences while implementing best practices that
            enhance both code quality and team productivity.
          </p>
        </div>
      </div>
    </section>
  );
}
