import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST() {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || apiKey === 're_xxxxxxxxx') {
    return NextResponse.json(
      { error: 'Missing or placeholder RESEND_API_KEY in environment variables.' },
      { status: 500 }
    );
  }

  if (!toEmail) {
    return NextResponse.json(
      { error: 'Missing CONTACT_TO_EMAIL in environment variables.' },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);

  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: toEmail,
    subject: 'Hello World',
    html: '<p>Congrats on sending your <strong>first email</strong>!</p>',
  });

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ data });
}

