import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// Helper to extract IP from request headers
function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return 'unknown';
}


async function getLocationFromIp(ip: string): Promise<{ city: string; country: string; region: string }> {
  if (!ip || ip === 'unknown' || ip === '::1' || ip === '127.0.0.1') {
    return { city: 'Localhost', country: 'Localhost', region: 'Localhost' };
  }
  try {
    const res = await fetch(`https://ip-api.com/json/${ip}`);
    const data = await res.json();
    if (data.status === 'success') {
      return {
        city: data.city || 'unknown',
        country: data.country || 'unknown',
        region: data.regionName || 'unknown',
      };
    }
    return { city: 'unknown', country: 'unknown', region: 'unknown' };
  } catch (error) {
    console.error('Error fetching location:', error);
    return { city: 'unknown', country: 'unknown', region: 'unknown' };
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { deviceName, browser } = body;

    const ip = getClientIp(req);
    const geo = await getLocationFromIp(ip);

    const now = new Date();
    const doc = {
      deviceName: deviceName || 'unknown',
      browser: browser || 'unknown',
      ip,
      city: geo.city,
      location: `${geo.region}, ${geo.country}`,
      date: now.toISOString().split('T')[0],
      time: now.toTimeString().split(' ')[0],
      createdAt: now,
    };

    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json({ ok: false, error: 'Database not configured' }, { status: 503 });
    }

    const result = await conn.db.collection('likes_main').insertOne(doc);

    return NextResponse.json({ ok: true, id: result.insertedId.toString() });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json({ ok: false, error: 'Database not configured' }, { status: 503 });
    }
    const list = await conn.db
      .collection('likes_main')
      .find({})
      .sort({ createdAt: -1 })
      .limit(100)
      .toArray();
    return NextResponse.json({ ok: true, data: list });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}
