import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET(req: NextRequest) {
    try {
        const conn = await connectToDatabase();
        if (!conn) {
            return NextResponse.json({ ok: false, error: 'Database not configured' }, { status: 503 });
        }

        // Fetch contacts
        const contacts = await conn.db
            .collection('contacts')
            .find({})
            .sort({ createdAt: -1 })
            .toArray();

        // Fetch main likes
        const likesMain = await conn.db
            .collection('likes_main')
            .find({})
            .sort({ createdAt: -1 })
            .toArray();

        // Fetch project likes
        const likesProject = await conn.db
            .collection('likes_project')
            .find({})
            .sort({ createdAt: -1 })
            .toArray();

        return NextResponse.json({
            ok: true,
            data: {
                contacts,
                likesMain,
                likesProject,
            },
        });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
    }
}
