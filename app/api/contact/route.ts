import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { name, email, message, obra } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Faltan campos' }, { status: 400 });
  }

  const subject = obra ? `Consulta sobre "${obra}" - ${name}` : `Mensaje de ${name}`;
  const text = obra
    ? `Obra: ${obra}\nNombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`
    : `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`;

  const { error } = await resend.emails.send({
    from: 'Contacto web <onboarding@resend.dev>',
    to: 'antoniomonelopez@gmail.com',
    replyTo: email,
    subject,
    text,
  });

  if (error) {
    return NextResponse.json({ error: 'Error al enviar' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
