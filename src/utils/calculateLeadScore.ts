import { VisitData } from '@/types/visitor';

export function calculateLeadScore(visit: VisitData): number {
  let score = 0;

  // 🌍 País estrangeiro (não Brasil)
  if (visit.geo?.country && !['BR', 'Brazil'].includes(visit.geo.country)) {
    score += 30;
  }

  // 👥 Visitante vindo do LinkedIn
  if (visit.referrer?.includes('linkedin.com')) {
    score += 40;
  }

  // 💼 User Agent corporativo heurístico (Windows comum em ambientes de trabalho)
  if (visit.userAgent.includes('Windows')) {
    score += 15;
  }

  // 🕓 Horário comercial UTC-3 (Brasil)
  const hour = new Date(visit.dataHora).getUTCHours();
  if (hour >= 12 && hour <= 22) {
    score += 10;
  }

  return score;
}
