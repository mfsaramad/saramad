'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, User, LayoutDashboard } from 'lucide-react';
import { useTheme } from 'next-themes';
import { SITE_CONFIG } from '@/lib/constants';
import SearchButton from '@/components/search/SearchButton';
import ThemeToggle from '@/components/theme/ThemeToggle';

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logoSrc = mounted && resolvedTheme === 'dark' ? '/logo-white.png' : '/logo.png';

  return (
    <>
      <header className={isScrolled ? 'fixed top-0 inset-x-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg shadow-sm border-b' : 'fixed top-0 inset-x-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md'}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 lg:w-14 lg:h-14 flex items-center justify-center">
                <img src={logoSrc} alt="سرآمد" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="text-lg lg:text-xl font-black text-brand-800">سرآمد</div>
                <div className="text-xs lg:text-sm font-bold text-slate-700 mt-0.5 hidden sm:block">مجتمع آموزش فنی و حرفه‌ای</div>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <Link key={item.href} href={item.href} className="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-brand-50 transition">
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-2">
              <ThemeToggle />
              <SearchButton />
              {isLoggedIn ? (
                <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-slate-100 rounded-lg">
                  <LayoutDashboard className="w-4 h-4" /> پنل کاربری
                </Link>
              ) : (
                <Link href="/login" className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-slate-100 rounded-lg">
                  <User className="w-4 h-4" /> ورود
                </Link>
              )}
            </div>

            <div className="lg:hidden flex items-center gap-2">
              <ThemeToggle />
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-lg bg-slate-100">
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-16 lg:hidden z-40 bg-white p-4">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl text-base font-medium">
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
