'use client';

import { useState, useEffect } from 'react';
import { X, Search } from 'lucide-react';
import Link from 'next/link';
import worksData from '@/data/works.json';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<typeof worksData>([]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const filtered = worksData.filter((work) =>
      work.title.toLowerCase().includes(query.toLowerCase()) ||
      work.category.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-start justify-center pt-20 px-4">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-xl">
        <div className="flex items-center gap-3 p-4 border-b">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar obras..."
            className="flex-1 outline-none text-gray-900"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        {results.length > 0 && (
          <div className="max-h-96 overflow-y-auto p-2">
            {results.map((work) => (
              <Link
                key={work.slug}
                href={`/obra/${work.slug}`}
                onClick={onClose}
                className="block p-3 hover:bg-gray-50 rounded transition-colors"
              >
                <div className="font-medium text-gray-900">{work.title}</div>
                <div className="text-sm text-gray-600">{work.category}</div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
