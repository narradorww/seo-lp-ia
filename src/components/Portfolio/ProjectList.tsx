import styles from './ProjectList.module.css';

const projects = [
  {
    title: 'HandsOn 3D',
    description: 'App React Native com renderização 3D em tempo real usando Three.js e integração com Firebase.',
  },
  {
    title: 'Cleanly Redirect System',
    description: 'Plugin WordPress com redirecionamento dinâmico por código postal e integração com Cleanly.',
  },
  {
    title: 'Balaio Rural',
    description: 'MVP SaaS para compras coletivas via WhatsApp com pagamentos PIX e estrutura escalável.',
  },
];

export default function ProjectList() {
  return (
    <div className={styles.carouselContainer}>
  {projects.map((project, index) => (
    <div key={index} className={styles.projectCard}>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
    </div>
  ))}
</div>

  );
}
