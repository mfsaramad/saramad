'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import SearchModal from './SearchModal';

export default function SearchButton() {
  const [isOpen, setIsOpen] = useState(false);

  // کلید میانبر Ctrl + K (یا Cmd + K در Mac)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition group"
        aria-label="جستجو"
      >
        <Search className="w-4 h-4 text-slate-500 group-hover:text-brand-800 transition" />
        <span className="hidden sm:inline text-sm text-slate-500 group-hover:text-brand-800 transition">
          جستجو...
        </span>
        <kbd className="hidden md:inline-flex items-center gap-1 px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-mono text-slate-500">
          <span className="text-[8px]">Ctrl</span>
          <span>K</span>
        </kbd>
      </button>

      <SearchModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}