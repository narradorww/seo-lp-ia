import { VisitorGeo } from "@/components/Stats/VisitorMap";


export function getTooltipContent(lead: VisitorGeo): string {
  const location = [lead.city, lead.region, lead.country].filter(Boolean).join(', ');
  const score = lead.leadScore ?? '–';
  const ref = lead.referrer ?? 'direto';

  return `
    <strong>${location}</strong><br/>
    Score: ${score}<br/>
    Origem: ${ref}
  `;
}
