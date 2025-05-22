import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

interface VisitDocument {
  geo: {
    latitude: number;
    longitude: number;
    city?: string;
    region?: string;
    country?: string;
    country_name?: string;
  } | null;
  leadScore?: number;
  referrer?: string;
}

interface VisitorGeo {
  latitude: number;
  longitude: number;
  city?: string;
  region?: string;
  country?: string;
  leadScore?: number;
  referrer?: string;
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('visitTracker');
    const collection = db.collection<VisitDocument>('visitas');

    // Buscar localizações para o mapa
    const cursor = await collection
      .find({
        geo: { $ne: null },
        'geo.latitude': { $ne: null },
        'geo.longitude': { $ne: null }
      })
      .sort({ dataHora: -1 })
      .limit(100)
      .toArray();

    const locations: VisitorGeo[] = cursor
      .filter(doc => doc.geo && doc.geo.latitude != null && doc.geo.longitude != null)
      .map((doc) => ({
        latitude: doc.geo!.latitude,
        longitude: doc.geo!.longitude,
        city: doc.geo?.city,
        region: doc.geo?.region,
        country: doc.geo?.country || doc.geo?.country_name,
        leadScore: doc.leadScore ?? 0,
        referrer: doc.referrer ?? 'direto',
      }));
    
    // Buscar estatísticas de países
    const countryStats = await collection.aggregate([
      { 
        $match: { 
          $or: [
            { 'geo.country': { $exists: true, $ne: null } },
            { 'geo.country_name': { $exists: true, $ne: null } }
          ]
        } 
      },
      {
        $group: {
          _id: { 
            $ifNull: ['$geo.country_name', '$geo.country'] 
          },
          count: { $sum: 1 },
          avgScore: { $avg: { $ifNull: ['$leadScore', 0] } }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]).toArray();

    const countrySummary = countryStats.map(stat => ({
      country: stat._id || 'Desconhecido',
      count: stat.count,
      avgScore: Math.round(stat.avgScore || 0)
    }));

    // Buscar contagem total de visitantes
    const totalVisitors = await collection.countDocuments();
    
    // Buscar contagem de visitantes únicos (por IP)
    const uniqueIPs = await collection.distinct('ip');
    const uniqueVisitors = uniqueIPs.length;

    return NextResponse.json({ 
      locations,
      countrySummary,
      stats: {
        totalVisitors,
        uniqueVisitors
      }
    });
  } catch (err) {
    console.error('[stats] erro:', err);
    return NextResponse.json({ error: 'Erro ao buscar dados de visitas' }, { status: 500 });
  }
}
