export async function resolveIpOrg(ip: string): Promise<string | null> {
    // Fallback services in order of preference
    const services = [
      {
        name: 'ipapi.co',
        url: `https://ipapi.co/${ip}/json/`,
        extractOrg: (data: any) => data?.org
      },
      {
        name: 'ip-api.com',
        url: `http://ip-api.com/json/${ip}?fields=org`,
        extractOrg: (data: any) => data?.org
      }
    ];

    for (const service of services) {
      try {
        console.log(`[resolveIpOrg] Tentando ${service.name} para IP: ${ip}`);
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout
        
        const response = await fetch(service.url, {
          signal: controller.signal,
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; SEO-LP-Bot/1.0)'
          }
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          console.warn(`[resolveIpOrg] ${service.name} retornou status ${response.status}`);
          continue;
        }
        
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await response.text();
          console.warn(`[resolveIpOrg] ${service.name} retornou não-JSON:`, contentType, text.substring(0, 100));
          continue;
        }
        
        const data = await response.json();
        const org = service.extractOrg(data);
        
        if (org && org.trim()) {
          console.log(`[resolveIpOrg] Sucesso com ${service.name}: ${org}`);
          return org.trim();
        }
        
        console.log(`[resolveIpOrg] ${service.name} não retornou organização válida`);
      } catch (err) {
        console.warn(`[resolveIpOrg] Falha em ${service.name}:`, err instanceof Error ? err.message : 'Erro desconhecido');
        continue;
      }
    }
  
    console.log(`[resolveIpOrg] Todos os serviços falharam para IP: ${ip}`);
    return null;
  }
  