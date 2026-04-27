import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { projectId, projectName, projectCategory, deviceName, browser } = body;
    const ip = getClientIp(req);
    const now = new Date();
    const doc = {
      _id: new ObjectId(),
      projectId: projectId || '',
      projectName: projectName || '',
      projectCategory: projectCategory || '',
      deviceName: deviceName || 'unknown',
      browser: browser || 'unknown',
      ip,
      createdAt: now,
    };

    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json({ ok: false, error: 'Database not configured' }, { status: 503 });
    }
    await conn.db.collection('likes_project').insertOne(doc);
    return NextResponse.json({ ok: true, id: doc._id.toString() });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}
