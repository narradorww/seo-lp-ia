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

  // 💼 Pontuação por sistema operacional
  const userAgent = visit.userAgent.toLowerCase();
  if (userAgent.includes('mac os') || userAgent.includes('macintosh') || userAgent.includes('iphone') || userAgent.includes('ipad')) {
    score += 25; // Apple (macOS, iOS) tem valor maior (geralmente dispositivos premium)
  } else if (userAgent.includes('windows')) {
    score += 15; // Windows tem valor intermediário
  } else if (userAgent.includes('android')) {
    score += 10; // Android tem valor base
  } else if (userAgent.includes('linux')) {
    score += 20; // Linux pode indicar perfil técnico
  }

  // 🕓 Horário comercial UTC-3 (Brasil)
  const hour = new Date(visit.dataHora).getUTCHours();
  if (hour >= 12 && hour <= 22) {
    score += 10;
  }

  // 🧠 Structured Enrichment analysis (prioridade para o formato estruturado)
  if (visit.structuredEnrichment) {
    const { platform, value } = visit.structuredEnrichment;

    switch (platform) {
      case 'email':
        if (value.includes('@')) {
          if (/(gmail|yahoo|hotmail|outlook|icloud)/.test(value.toLowerCase())) {
            score += 30; // e-mail gratuito
          } else {
            score += 50; // e-mail corporativo
          }
        }
        break;
      
      case 'linkedin':
        score += 40; // LinkedIn tem alto valor
        break;
      
      case 'github':
        score += 30; // GitHub tem bom valor (desenvolvedor)
        break;
      
      case 'twitter':
      case 'instagram':
        score += 25; // Redes sociais genéricas
        break;
      
      case 'phone':
        score += 60; // Telefone tem valor máximo (contato direto)
        break;
      
      default:
        score += 15; // Plataforma não reconhecida, mas algum valor
    }
  }
  // 🧠 Legacy Enrichment analysis - formato antigo como fallback
  else if (visit.enrichment) {
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
