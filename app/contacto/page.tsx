'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Instagram } from 'lucide-react';

export default function ContactoPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Formulario enviado (funcionalidad de demostración)');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          {t.contact.title}
        </h1>
        <p className="text-gray-700 text-lg mb-12">
          {t.contact.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.contact.name}
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-blue-600 transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.contact.email}
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-blue-600 transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.contact.message}
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-blue-600 transition-colors resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
              >
                {t.contact.send}
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Información de Contacto</h2>
              <div className="space-y-4">
                <a
                  href="mailto:contact@artist.com"
                  className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span>contact@artist.com</span>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                  <span>@antoniomonereo</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
