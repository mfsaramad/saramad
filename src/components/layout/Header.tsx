'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Search, User } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

const NAV_ITEMS = [
  { href: '/', label: 'خانه' },
  { href: '/courses', label: 'دوره‌ها' },
  { href: '/instructors', label: 'اساتید' },
  { href: '/blog', label: 'وبلاگ' },
  { href: '/contact', label: 'تماس' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={
          isScrolled
            ? 'fixed top-0 inset-x-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-lg shadow-sm border-b border-slate-200'
            : 'fixed top-0 inset-x-0 z-50 transition-all duration-300 bg-white/80 backdrop-blur-md'
        }
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 lg:w-14 lg:h-14 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Image
                  src="/logo.png"
                  alt="لوگوی آموزشگاه سرآمد"
                  width={56}
                  height={56}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
              <div>
                <div className="text-lg lg:text-xl font-black text-brand-800">
                  سرآمد
                </div>
                <div className="text-[10px] text-slate-500 -mt-1 hidden sm:block">
                  مجتمع آموزش فنی و حرفه‌ای
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 hover:text-brand-800 hover:bg-brand-50 transition"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Buttons */}
            <div className="hidden lg:flex items-center gap-2">
              <Link
                href="/login"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-brand-800 hover:bg-brand-50 rounded-lg transition"
              >
                <User className="w-4 h-4" />
                ورود
              </Link>
              <Link
                href="/register"
                className="px-5 py-2.5 text-sm font-bold text-white rounded-lg gradient-accent hover:shadow-lg transition-all"
              >
                ثبت‌نام
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-slate-100 transition">
                <Search className="w-5 h-5 text-slate-700" />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-slate-100 transition"
                aria-label="منو"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-slate-700" />
                ) : (
                  <Menu className="w-6 h-6 text-slate-700" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-16 lg:hidden z-40 bg-white overflow-y-auto">
          <nav className="px-4 py-4 space-y-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-xl text-base font-medium text-slate-700 hover:bg-slate-50 transition"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/exams"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-xl text-base font-medium text-slate-700 hover:bg-slate-50 transition"
            >
              آزمون آنلاین
            </Link>
            <Link
              href="/shop"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-xl text-base font-medium text-slate-700 hover:bg-slate-50 transition"
            >
              فروشگاه
            </Link>
            <Link
              href="/branches"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-xl text-base font-medium text-slate-700 hover:bg-slate-50 transition"
            >
              شعبه‌ها
            </Link>

            <div className="pt-4 border-t border-slate-200 flex gap-2">
              <Link
                href="/login"
                className="flex-1 text-center px-4 py-3 text-sm font-bold text-brand-800 border-2 border-brand-200 rounded-xl hover:bg-brand-50 transition"
              >
                ورود
              </Link>
              <Link
                href="/register"
                className="flex-1 text-center px-4 py-3 text-sm font-bold text-white rounded-xl gradient-accent"
              >
                ثبت‌نام
              </Link>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-200 space-y-2 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <span>📞</span>
                <span>{SITE_CONFIG.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📍</span>
                <span className="text-xs">{SITE_CONFIG.address}</span>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}