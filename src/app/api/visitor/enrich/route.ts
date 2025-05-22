import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { calculateLeadScore } from '@/utils/calculateLeadScore';
import { VisitData, EnrichmentData } from '@/types/visitor';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { enrichment, structuredEnrichment } = body;

    // Verificação de dados - aceita tanto o formato legado (string) quanto o novo formato estruturado
    if ((!enrichment || typeof enrichment !== 'string') && 
        (!structuredEnrichment || typeof structuredEnrichment !== 'object')) {
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
      enrichment, // adiciona o campo legado para compatibilidade
      structuredEnrichment, // adiciona o novo formato estruturado
    };

    const newScore = calculateLeadScore(updatedVisit);

    // Prepara objeto de atualização
    const updateData: Partial<VisitData> = {
      enrichment,
      leadScore: newScore,
    };
    
    // Adiciona dados estruturados se fornecidos
    if (structuredEnrichment) {
      updateData.structuredEnrichment = structuredEnrichment;
    }

    await collection.updateOne(
      { _id: latestVisit._id },
      {
        $set: updateData,
      }
    );

    return NextResponse.json({ 
      status: 'ok', 
      newScore,
      enrichmentType: structuredEnrichment ? structuredEnrichment.platform : 'legacy'
    });
  } catch (error) {
    console.error('[visitor enrich] erro:', error);
    return NextResponse.json({ error: 'Erro ao enriquecer visita' }, { status: 500 });
  }
}
