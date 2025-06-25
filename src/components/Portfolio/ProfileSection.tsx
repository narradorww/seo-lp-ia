// src/components/Profile/ProfileSection.tsx
'use client';

import Badge from '../common/Badge';
import styles from './ProfileSection.module.css';
;
import { ArrowDown, Code, Rocket, Users } from 'lucide-react';

const skills = [
  'JavaScript', 'TypeScript', 'React Native', 'React.js',
  'Next.js', 'Node.js', 'MongoDB', 'AWS', 'Generative AI', 'Agile', 'Scrum'
];

export default function ProfileSection() {
  return (
    <section id="profile" className={styles.section} role="main" aria-labelledby="profile-heading">
      <div className={styles.container}>
        <header>
          <h2 id="profile-heading" className={styles.sectionTitle}>
            Professional <span className={styles.highlight}>Profile</span>
          </h2>
        </header>

        <div className={styles.columns} role="group" aria-label="Professional skills and expertise">
          {/* Technical Expertise */}
          <article className={styles.card} aria-labelledby="technical-heading">
            <header className={styles.cardHeader}>
              <Code size={24} aria-hidden="true" />
              <h3 id="technical-heading">Technical Expertise</h3>
            </header>
            <p className={styles.text}>
              Expert in JavaScript and TypeScript with strong focus on mobile development using React Native.
              Full-stack capabilities with experience in React.js, Next.js, Node.js, MongoDB, and AWS.
            </p>
            <div className={styles.badgeList} role="list" aria-label="Technical skills">
              {skills.map(skill => (
                <span key={skill} role="listitem">
                  <Badge>{skill}</Badge>
                </span>
              ))}
            </div>
          </article>

          {/* Team Leadership */}
          <article className={styles.card} aria-labelledby="leadership-heading">
            <header className={styles.cardHeader}>
              <Users size={24} aria-hidden="true" />
              <h3 id="leadership-heading">Team Leadership</h3>
            </header>
            <p className={styles.text}>
              Led agile development teams following Scrum methodologies.
              Strong record of improving developer experience and implementing efficient workflows with Jira.
            </p>
            <ul className={styles.list} aria-label="Leadership capabilities">
              <li>Agile team management</li>
              <li>Scrum implementation</li>
              <li>Workflow optimization</li>
              <li>Code quality improvement</li>
              <li>Mentorship and knowledge sharing</li>
            </ul>
          </article>

          {/* Innovation Focus */}
          <article className={styles.card} aria-labelledby="innovation-heading">
            <header className={styles.cardHeader}>
              <Rocket size={24} aria-hidden="true" />
              <h3 id="innovation-heading">Innovation Focus</h3>
            </header>
            <p className={styles.text}>
              Passionate about applying cutting-edge technologies to solve real-world problems.
              Special interest in Generative AI applications and their integration into mobile development.
            </p>
            <ul className={styles.list} aria-label="Innovation achievements">
              <li>Award-winning AI projects</li>
              <li>Sustainability solutions</li>
              <li>Efficiency optimization</li>
              <li>UX enhancement through AI</li>
              <li>Continuous learning mindset</li>
            </ul>
          </article>
        </div>

        {/* Professional Journey */}
        <article className={styles.journeyCard} aria-labelledby="journey-heading">
          <h3 id="journey-heading">Professional Journey</h3>
          <p>
            With over 20 years in technology and more than 3 years focused on software development,
            I've led impactful projects across various industries. My expertise lies in crafting
            efficient, user-friendly mobile experiences while implementing best practices that
            enhance both code quality and team productivity.
          </p>
        </article>
      </div>
      <div className={styles.scrollDown} role="navigation" aria-label="Navigate to projects section">
        <a href="#projects" aria-label="Scroll down to projects section">
          <ArrowDown size={24} />
        </a>
      </div>
    </section>
  );
}
