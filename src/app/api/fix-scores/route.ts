import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { calculateLeadScore } from '@/utils/calculateLeadScore';
import { VisitData } from '@/types/visitor';

export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('visitTracker');
    const collection = db.collection('visitas');

    const cursor = collection.find({});
    let updated = 0;
    let erros: string[] = [];

    for await (const doc of cursor) {
      try {
        const score = calculateLeadScore(doc as unknown as VisitData);
        await collection.updateOne({ _id: doc._id }, { $set: { leadScore: score } });
        updated++;
      } catch (err) {
        erros.push(`Erro no doc ${doc._id}: ${String(err)}`);
      }
    }

    return NextResponse.json({ message: `Atualizados ${updated}`, erros });
  } catch (err: any) {
    console.error('[fix-scores] erro fatal:', err);
    return NextResponse.json(
      { error: 'Erro interno ao recalcular scores', detalhe: String(err) },
      { status: 500 }
    );
  }
}
