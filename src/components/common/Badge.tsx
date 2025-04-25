// src/components/ui/Badge.tsx
import styles from './Badge.module.css';
import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
}

export default function Badge({ children }: BadgeProps) {
  return <span className={styles.badge}>{children}</span>;
}
