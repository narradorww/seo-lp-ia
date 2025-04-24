export function getLeadColor(score: number = 0): string {
    if (score >= 70) return 'red';
    if (score >= 31) return 'orange';
    return 'blue';
  }
  