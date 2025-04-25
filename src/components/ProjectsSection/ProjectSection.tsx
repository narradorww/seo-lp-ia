'use client';

import ProjectCard from '../common/ProjectCard';
import styles from './ProjectsSection.module.css';


const projects = [
  {
    title: "Fretador (Logistics App)",
    description: "Mobile freight management solution for TRC Logistics",
    challenge: "Taking charge of an unfinished project that required significant refactoring, process implementation, and LGPD compliance to meet industry standards.",
    outcome: "Successfully delivered a complete, compliant freight management platform with improved code quality, enhanced user experience, and increased customer trust.",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80",
    technologies: ["React Native", "Next.js", "Node.js", "MongoDB", "AWS"]
  },
  {
    title: "RecicleLink",
    description: "First Place at Hack for Change 2023 (Alura + FIAP)",
    challenge: "Creating a platform to connect recycling cooperatives with waste generators and optimize sorting processes that were inefficient and manual.",
    outcome: "Developed an AI-powered solution that streamlines recycling operations, improving efficiency by 40% and increasing material recovery rates for cooperatives.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80",
    technologies: ["Generative AI", "React", "Node.js", "AWS", "Computer Vision"]
  },
  {
    title: "\"Scooby-Doo, Where Are You?\"",
    description: "6th Place at AI Immersion 2023 (Alura + Google)",
    challenge: "Addressing the critical problem of pets getting lost during natural disasters and the difficulty in reuniting them with their owners.",
    outcome: "Created an AI-driven application using image recognition to match lost pets with their owners, recognized among 1200+ projects for its innovative approach.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80",
    technologies: ["Image Recognition", "React Native", "Google Cloud", "TensorFlow"]
  }
];

export default function ProjectsSection() {
  return (
    <section id="projects" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Featured <span className={styles.highlight}>Projects</span></h2>
        <p className={styles.description}>
          A selection of my most impactful work, showcasing problem-solving abilities and technical expertise in mobile development and AI solutions.
        </p>

        <div className={styles.projectsList}>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              challenge={project.challenge}
              outcome={project.outcome}
              image={project.image}
              technologies={project.technologies}
              isReversed={index % 2 !== 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
