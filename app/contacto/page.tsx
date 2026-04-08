'use client';

import { useState, Suspense } from 'react';
import TikTokIcon from '@/components/TikTokIcon';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Instagram, CheckCircle } from 'lucide-react';
import Footer from '@/components/Footer';

function ContactoContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const obra = searchParams.get('obra');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, obra }),
      });

      if (res.ok) {
        setStatus('sent');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
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
              {obra && (
                <div className="mb-6 px-4 py-3 bg-gray-50 border border-gray-200 text-[13px] text-gray-700">
                  Consultando sobre: <span className="font-medium text-gray-900">{obra}</span>
                </div>
              )}

              {status === 'sent' ? (
                <div className="flex flex-col items-start gap-4 py-8">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                  <p className="text-gray-900 text-lg font-medium leading-[1.8]">
                    {t.contact.sent}
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="text-[13px] font-normal tracking-wide text-blue-600 underline decoration-1 underline-offset-2 hover:text-blue-800 transition-colors"
                  >
                    {t.contact.sendAnother}
                  </button>
                </div>
              ) : (
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

                  {status === 'error' && (
                    <p className="text-red-600 text-[13px]">{t.contact.error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="px-6 py-2 bg-blue-600 text-white text-[13px] font-normal tracking-wide hover:bg-blue-800 transition-colors disabled:opacity-50"
                  >
                    {status === 'sending' ? t.contact.sending : t.contact.send}
                  </button>
                </form>
              )}
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
                    href="https://www.instagram.com/antoniomonereo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[13px] font-normal tracking-wide text-blue-600 underline decoration-1 underline-offset-2 hover:text-blue-800 transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                    <span>@antoniomonereo</span>
                  </a>
                  <a
                    href="https://www.tiktok.com/@antoniomonereo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[13px] font-normal tracking-wide text-blue-600 underline decoration-1 underline-offset-2 hover:text-blue-800 transition-colors"
                  >
                    <TikTokIcon className="w-5 h-5" />
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

export default function ContactoPage() {
  return (
    <Suspense>
      <ContactoContent />
    </Suspense>
  );
}
