import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { projectId, projectName, projectCategory, rating, reviewDetail } = body;
    const now = new Date();
    const doc = {
      _id: new ObjectId(),
      projectId: projectId || '',
      projectName: projectName || '',
      projectCategory: projectCategory || '',
      rating: typeof rating === 'number' ? Math.min(5, Math.max(1, rating)) : 5,
      reviewDetail: String(reviewDetail || '').trim() || '',
      createdAt: now,
    };

    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json({ ok: false, error: 'Database not configured' }, { status: 503 });
    }
    await conn.db.collection('reviews').insertOne(doc);
    return NextResponse.json({ ok: true, id: doc._id.toString() });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}
