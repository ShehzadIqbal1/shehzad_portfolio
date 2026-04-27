import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message, subject } = body;
    const now = new Date();
    const doc = {
      _id: new ObjectId(),
      name: String(name || '').trim(),
      email: String(email || '').trim(),
      message: String(message || '').trim(),
      subject: String(subject || 'Portfolio contact').trim(),
      createdAt: now,
    };

    if (!doc.name || !doc.email || !doc.message) {
      return NextResponse.json({ ok: false, error: 'Name, email and message are required' }, { status: 400 });
    }

    const conn = await connectToDatabase();
    if (conn) {
      await conn.db.collection('contacts').insertOne(doc);
    }

    const mailUser = process.env.SMTP_USER;
    const mailPass = process.env.SMTP_PASS;
    const toEmail = process.env.CONTACT_EMAIL || process.env.SMTP_USER || doc.email;

    if (mailUser && mailPass) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: Number(process.env.SMTP_PORT) || 587,
        secure: false,
        auth: { user: mailUser, pass: mailPass },
      });
      await transporter.sendMail({
        from: `"Portfolio" <${mailUser}>`,
        to: toEmail,
        subject: `Contact: ${doc.subject}`,
        text: `From: ${doc.name} <${doc.email}>\n\n${doc.message}`,
        html: `<p><strong>From:</strong> ${doc.name} &lt;${doc.email}&gt;</p><p><strong>Subject:</strong> ${doc.subject}</p><p>${doc.message.replace(/\n/g, '<br>')}</p>`,
      });
    }

    return NextResponse.json({ ok: true, id: doc._id.toString() });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}
