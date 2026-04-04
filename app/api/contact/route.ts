import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Faltan campos' }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: 'Contacto web <onboarding@resend.dev>',
    to: 'antoniomonelopez@gmail.com',
    replyTo: email,
    subject: `Mensaje de ${name}`,
    text: `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`,
  });

  if (error) {
    return NextResponse.json({ error: 'Error al enviar' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
