'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Instagram } from 'lucide-react';
import Footer from '@/components/Footer';

export default function ContactoPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Construir el cuerpo del email
    const subject = `Consulta de ${formData.name}`;
    const body = `Nombre: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0AMensaje:%0D%0A${formData.message}`;

    // Abrir cliente de correo con los datos prellenados
    window.location.href = `mailto:antoniomonelopez@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;

    // Limpiar formulario después de un breve delay
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
    }, 500);
  };

  return (
    <div className="flex flex-col min-h-full">
      <div className="flex-1 bg-white">
        <div className="max-w-4xl mx-auto px-8 py-16 lg:py-24">
          <h1 className="text-3xl lg:text-4xl font-medium text-gray-900 mb-6 tracking-tight leading-[1.3]">
            {t.contact.title}
          </h1>
          <p className="text-gray-800 leading-[1.8] mb-12">
            {t.contact.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-[13px] font-normal tracking-wide text-gray-700 mb-2">
                    {t.contact.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-400 focus:outline-none focus:border-blue-600 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-[13px] font-normal tracking-wide text-gray-700 mb-2">
                    {t.contact.email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-400 focus:outline-none focus:border-blue-600 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-[13px] font-normal tracking-wide text-gray-700 mb-2">
                    {t.contact.message}
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-400 focus:outline-none focus:border-blue-600 transition-colors resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white text-[13px] font-normal tracking-wide hover:bg-blue-800 transition-colors"
                >
                  {t.contact.send}
                </button>
              </form>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-medium text-gray-900 mb-6 tracking-tight">Información de Contacto</h2>
                <div className="space-y-4">
                  <a
                    href="mailto:antoniomonelopez@gmail.com"
                    className="flex items-center gap-3 text-[13px] font-normal tracking-wide text-blue-600 underline decoration-1 underline-offset-2 hover:text-blue-800 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span>antoniomonelopez@gmail.com</span>
                  </a>
                  <a
                    href="https://www.instagram.com/antoniomonereo?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[13px] font-normal tracking-wide text-blue-600 underline decoration-1 underline-offset-2 hover:text-blue-800 transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                    <span>@antoniomonereo</span>
                  </a>
                  <a
                    href="https://www.tiktok.com/@antoniomonereo?is_from_webapp=1&sender_device=pc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[13px] font-normal tracking-wide text-blue-600 underline decoration-1 underline-offset-2 hover:text-blue-800 transition-colors"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                    <span>@antoniomonereo</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
