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
  const [isLoggedIn] = useState(true);
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

  // انتخاب لوگو بر اساس تم
  const logoSrc =
    mounted && resolvedTheme === 'dark' ? '/logo-white.png' : '/logo.png';

  return (
    <>
      <header
        className={
          isScrolled
            ? 'fixed top-0 inset-x-0 z-50 transition-all duration-300 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg shadow-sm border-b border-slate-200 dark:border-slate-800'
            : 'fixed top-0 inset-x-0 z-50 transition-all duration-300 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md'
        }
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 lg:w-14 lg:h-14 flex items-center justify-center group-hover:scale-105 transition-transform">
                <img
                  src={logoSrc}
                  alt="آموزشگاه سرآمد"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="text-lg lg:text-xl font-black text-brand-800 dark:text-brand-100 leading-tight">
                  سرآمد
                </div>
                <div className="text-xs lg:text-sm font-bold text-slate-700 dark:text-slate-200 mt-0.5 hidden sm:block">
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
                  className="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-brand-800 dark:hover:text-brand-100 hover:bg-brand-50 dark:hover:bg-slate-800 transition"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Buttons */}
            <div className="hidden lg:flex items-center gap-2">
              <ThemeToggle />
              <SearchButton />

              {isLoggedIn ? (
                <>
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-brand-800 dark:text-brand-100 hover:bg-brand-50 dark:hover:bg-slate-800 rounded-lg transition"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    پنل کاربری
                  </Link>

                  <Link
                    href="/dashboard/profile"
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1e3a8a] to-[#0d9488] flex items-center justify-center text-white font-black shadow-lg hover:scale-105 transition-transform"
                    title="پروفایل من"
                  >
                    ک
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-brand-800 dark:text-brand-100 hover:bg-brand-50 dark:hover:bg-slate-800 rounded-lg transition"
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
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-2">
              <ThemeToggle />
              <SearchButton />

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                aria-label="منو"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-slate-700 dark:text-slate-200" />
                ) : (
                  <Menu className="w-6 h-6 text-slate-700 dark:text-slate-200" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-16 lg:hidden z-40 bg-white dark:bg-slate-900 overflow-y-auto">
          <nav className="px-4 py-4 space-y-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-xl text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/exams"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-xl text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >
              آزمون آنلاین
            </Link>
            <Link
              href="/shop"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-xl text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >
              فروشگاه
            </Link>
            <Link
              href="/branches"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-xl text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >
              شعبه‌ها
            </Link>

            {isLoggedIn ? (
              <Link
                href="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-bold bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white transition"
              >
                <LayoutDashboard className="w-5 h-5" />
                پنل کاربری
              </Link>
            ) : (
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex gap-2">
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex-1 text-center px-4 py-3 text-sm font-bold text-brand-800 dark:text-brand-100 border-2 border-brand-200 dark:border-brand-800 rounded-xl hover:bg-brand-50 dark:hover:bg-slate-800 transition"
                >
                  ورود
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex-1 text-center px-4 py-3 text-sm font-bold text-white rounded-xl gradient-accent"
                >
                  ثبت‌نام
                </Link>
              </div>
            )}

            <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800 space-y-2 text-sm text-slate-600 dark:text-slate-400">
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