import { VisitData } from '@/types/visitor';

export function calculateLeadScore(visit: VisitData): number {
  let score = 0;

  // 🌍 País estrangeiro (não Brasil)
  if (visit.geo?.country && !['BR', 'Brazil'].includes(visit.geo.country)) {
    score += 30;
  }

  // 👥 Referrer vindo do LinkedIn
  if (visit.referrer?.toLowerCase().includes('linkedin')) {
    score += 40;
  }

  // 💼 User Agent corporativo heurístico
  if (visit.userAgent.includes('Windows')) {
    score += 15;
  }

  // 🕓 Horário comercial UTC-3 (Brasil)
  const hour = new Date(visit.dataHora).getUTCHours();
  if (hour >= 12 && hour <= 22) {
    score += 10;
  }

  // 🧠 Enrichment analysis
  if (visit.enrichment) {
    const enrich = visit.enrichment.toLowerCase();

    // Detectar email
    if (enrich.includes('@')) {
      if (/(gmail|yahoo|hotmail|outlook|icloud)/.test(enrich)) {
        score += 30; // e-mail gratuito
      } else {
        score += 50; // e-mail corporativo
      }
    }

    // Detectar LinkedIn
    if (enrich.includes('linkedin.com')) {
      score += 40;
    }

    // Detectar GitHub, Twitter, Medium, etc
    if (/(github|twitter|medium|instagram|facebook)/.test(enrich)) {
      score += 25;
    }

    // Detectar número de telefone (formato genérico)
    if (/\+?\d{10,15}/.test(enrich)) {
      score += 60;
    }
  }

  return score;
}
