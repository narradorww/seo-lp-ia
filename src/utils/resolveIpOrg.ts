export async function resolveIpOrg(ip: string): Promise<string | null> {
    try {
      const response = await fetch(`https://ipapi.co/${ip}/json/`);
      const data = await response.json();
  
      if (data && data.org) {
        return data.org;
      }
    } catch (err) {
      console.error('[resolveIpOrg] Falha ao consultar ipapi:', err);
    }
  
    return null;
  }
  