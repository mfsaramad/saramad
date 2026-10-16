'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, User, LayoutDashboard } from 'lucide-react';
import { useTheme } from 'next-themes';
import { SITE_CONFIG } from '@/lib/constants';
import SearchButton from '@/components/search/SearchButton';
import ThemeToggle from '@/components/theme/ThemeToggle';
import { useCart } from '@/contexts/CartContext';

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
  const pathname = usePathname();

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

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={
          isScrolled
            ? 'fixed top-0 inset-x-0 z-50 transition-all duration-300 bg-white dark:bg-slate-900 shadow-lg border-b border-slate-200 dark:border-slate-800'
            : 'fixed top-0 inset-x-0 z-50 transition-all duration-300 bg-white dark:bg-slate-900 shadow-sm border-b border-slate-100 dark:border-slate-800'
        }
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Logo — واضح‌تر */}
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <div
                className="w-14 h-14 lg:w-16 lg:h-16 flex items-center justify-center rounded-xl overflow-hidden transition-all duration-300 group-hover:scale-110"
                style={{
                  background: 'transparent',
                }}
              >
                <img
                  src={logoSrc}
                  alt="آموزشگاه سرآمد"
                  className="w-full h-full object-contain drop-shadow-md"
                />
              </div>
              <div className="hidden sm:block">
                <div className="text-xl lg:text-2xl font-black leading-tight bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] bg-clip-text text-transparent">
                  سرآمد
                </div>
                <div className="text-[11px] lg:text-xs font-black text-slate-700 dark:text-slate-300 mt-0.5">
                  مجتمع آموزش فنی و حرفه‌ای
                </div>
              </div>
            </Link>

            {/* Desktop Nav — با hover واضح */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      relative px-5 py-2.5 rounded-xl text-base font-black transition-all duration-200
                      ${
                        active
                          ? 'text-white bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] shadow-md shadow-blue-900/20'
                          : 'text-slate-800 dark:text-slate-100 hover:text-white hover:bg-gradient-to-l hover:from-[#1e3a8a] hover:to-[#0d9488] hover:shadow-md hover:shadow-blue-900/20 hover:-translate-y-0.5'
                      }
                    `}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <ThemeToggle />
              <SearchButton />

              {isLoggedIn ? (
                <>
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 px-5 py-2.5 text-sm font-black text-white bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] rounded-xl shadow-md shadow-blue-900/30 hover:shadow-lg hover:shadow-blue-900/40 hover:scale-105 hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    پنل کاربری
                  </Link>

                  <Link
                    href="/dashboard/profile"
                    className="w-11 h-11 rounded-full bg-gradient-to-br from-[#1e3a8a] to-[#0d9488] flex items-center justify-center text-white font-black text-lg shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-200 ring-2 ring-white dark:ring-slate-900"
                    title="پروفایل من"
                  >
                    ک
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="flex items-center gap-2 px-5 py-2.5 text-sm font-black text-[#1e3a8a] dark:text-white border-2 border-[#1e3a8a] dark:border-slate-700 rounded-xl hover:bg-[#1e3a8a] hover:text-white dark:hover:bg-white dark:hover:text-[#1e3a8a] transition-all duration-200"
                  >
                    <User className="w-4 h-4" />
                    ورود
                  </Link>
                  <Link
                    href="/register"
                    className="px-5 py-2.5 text-sm font-black text-white rounded-xl bg-gradient-to-l from-[#f97316] to-[#ea580c] shadow-md shadow-orange-500/30 hover:shadow-lg hover:scale-105 hover:-translate-y-0.5 transition-all duration-200"
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
          <nav className="px-4 py-4 space-y-2">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    block px-4 py-3 rounded-xl text-base font-black transition-all
                    ${
                      active
                        ? 'text-white bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] shadow-md'
                        : 'text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                    }
                  `}
                >
                  {item.label}
                </Link>
              );
            })}

            <Link
              href="/exams"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-xl text-base font-black text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              آزمون آنلاین
            </Link>
            <Link
              href="/shop"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-xl text-base font-black text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              فروشگاه
            </Link>
            <Link
              href="/branches"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-xl text-base font-black text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              شعبه‌ها
            </Link>

            {isLoggedIn ? (
              <Link
                href="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-black bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white transition shadow-md mt-4"
              >
                <LayoutDashboard className="w-5 h-5" />
                پنل کاربری
              </Link>
            ) : (
              <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800 flex gap-2">
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex-1 text-center px-4 py-3 text-sm font-black text-[#1e3a8a] dark:text-white border-2 border-[#1e3a8a] dark:border-slate-700 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-800 transition"
                >
                  ورود
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex-1 text-center px-4 py-3 text-sm font-black text-white rounded-xl bg-gradient-to-l from-[#f97316] to-[#ea580c] shadow-md"
                >
                  ثبت‌نام
                </Link>
              </div>
            )}

            <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800 space-y-2 text-sm font-bold text-slate-800 dark:text-slate-200">
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