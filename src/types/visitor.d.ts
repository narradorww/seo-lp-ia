export interface VisitorGeoData {
    ip: string;
    version: string;
    city: string;
    region: string;
    region_code: string;
    country_code: string;
    country_code_iso3: string;
    country_name: string;
    country_capital: string;
    country_tld: string;
    continent_code: string;
    in_eu: boolean;
    postal: string;
    latitude: number;
    longitude: number;
    timezone: string;
    utc_offset: string;
    country_calling_code: string;
    currency: string;
    currency_name: string;
    languages: string;
    country_area: number;
    country_population: number;
    asn: string;
    org: string;
    hostname: string;
    enrichment?: string;
  }

  
  export interface VisitorInfo {
    ip: string;
    userAgent?: string | null;
    referrer?: string | null;
    geo?: VisitorGeoData;
  }

  export interface EnrichmentData {
    platform: string;
    value: string;
  }

  export interface VisitData {
    ip: string;
    userAgent: string;
    referrer?: string;
    sistema_operacional: string;
    navegador: string;
    dispositivo: string;
    geo?: {
      city?: string;
      region?: string;
      country?: string;
      country_name?: string;
      latitude?: number;
      longitude?: number;
    };
    dataHora: Date;
    ipOrg?: string;
    isBot?: boolean;
    leadScore?: number;
    enrichment?: string;
    structuredEnrichment?: EnrichmentData;
    page?: string;
    action?: string;
  }
  
  