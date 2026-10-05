'use client';

import { Bell, Search, Menu } from 'lucide-react';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

export function AdminHeader() {
  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 h-16">
        {/* Left (in RTL = right side) */}
        <div className="flex items-center gap-3 flex-1">
          <button
            type="button"
            className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            aria-label="منو"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="relative max-w-md w-full hidden sm:block">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="search"
              placeholder="جستجو..."
              className="w-full pr-10 pl-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-gray-900 outline-none text-sm transition"
            />
          </div>
        </div>

        {/* Right (in RTL = left side) */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          <button
            type="button"
            className="relative w-10 h-10 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            aria-label="اعلانات"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500" />
          </button>

          <div className="flex items-center gap-2 pr-2 mr-2 border-r border-gray-200 dark:border-gray-800">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
              A
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                مدیر سیستم
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                admin@saramad.ir
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}