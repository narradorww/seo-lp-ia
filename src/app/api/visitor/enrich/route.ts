import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { calculateLeadScore } from '@/utils/calculateLeadScore';
import { VisitData } from '@/types/visitor';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { enrichment } = body;

    if (!enrichment || typeof enrichment !== 'string') {
      return NextResponse.json({ error: 'Invalid enrichment data' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('visitTracker');
    const collection = db.collection<VisitData>('visitas');

    // ⚡ Busca o visitante mais recente
    const latestVisit = await collection.findOne({}, { sort: { dataHora: -1 } });

    if (!latestVisit) {
      return NextResponse.json({ error: 'No recent visit found' }, { status: 404 });
    }

    // 🧠 Atualiza o documento
    const updatedVisit = {
      ...latestVisit,
      enrichment, // adiciona o campo
    };

    const newScore = calculateLeadScore(updatedVisit);

    await collection.updateOne(
      { _id: latestVisit._id },
      {
        $set: {
          enrichment,
          leadScore: newScore,
        },
      }
    );

    return NextResponse.json({ status: 'ok', newScore });
  } catch (error) {
    console.error('[visitor enrich] erro:', error);
    return NextResponse.json({ error: 'Erro ao enriquecer visita' }, { status: 500 });
  }
}
