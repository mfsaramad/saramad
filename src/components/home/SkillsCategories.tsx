import Link from 'next/link';
import {
  Code2,
  Palette,
  Calculator,
  Languages,
  Music,
  Briefcase,
} from 'lucide-react';
import { skillCategories } from '@/lib/data';
import { toPersianNumber } from '@/lib/format';
import SectionTitle from '@/components/shared/SectionTitle';
import { cn } from '@/lib/utils';

const iconMap = {
  code: Code2,
  palette: Palette,
  calculator: Calculator,
  languages: Languages,
  music: Music,
  briefcase: Briefcase,
} as const;

const colorMap = {
  brand: {
    bg: 'bg-brand-50',
    hoverBg: 'group-hover:bg-brand-800',
    iconBg: 'bg-brand-100',
    hoverIconBg: 'group-hover:bg-brand-800',
    iconColor: 'text-brand-800',
    hoverIconColor: 'group-hover:text-white',
    border: 'hover:border-brand-800',
  },
  teal: {
    bg: 'bg-teal-50',
    hoverBg: 'group-hover:bg-teal-500',
    iconBg: 'bg-teal-100',
    hoverIconBg: 'group-hover:bg-teal-500',
    iconColor: 'text-teal-600',
    hoverIconColor: 'group-hover:text-white',
    border: 'hover:border-teal-500',
  },
  accent: {
    bg: 'bg-orange-50',
    hoverBg: 'group-hover:bg-orange-500',
    iconBg: 'bg-orange-100',
    hoverIconBg: 'group-hover:bg-orange-500',
    iconColor: 'text-orange-600',
    hoverIconColor: 'group-hover:text-white',
    border: 'hover:border-orange-500',
  },
} as const;

export default function SkillsCategories() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="دسته‌بندی مهارت‌ها"
          title="در چه زمینه‌ای می‌خواهی حرفه‌ای شوی؟"
          description="در هر زمینه‌ای که علاقه داری، سرآمد کنارت است تا مسیر حرفه‌ای شدن را طی کنی"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {skillCategories.map((category) => {
            const Icon = iconMap[category.icon as keyof typeof iconMap];
            const colors = colorMap[category.color as keyof typeof colorMap];

            return (
              <Link
                key={category.id}
                href={category.href}
                className={cn(
                  'group relative bg-slate-50 rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border-2 border-transparent',
                  colors.border
                )}
              >
                {/* آیکون */}
                <div
                  className={cn(
                    'w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 transition-all duration-300',
                    colors.iconBg,
                    colors.hoverIconBg
                  )}
                >
                  <Icon
                    className={cn(
                      'w-7 h-7 transition-colors duration-300',
                      colors.iconColor,
                      colors.hoverIconColor
                    )}
                    strokeWidth={2}
                  />
                </div>

                {/* عنوان */}
                <h3 className="font-black text-slate-800 text-sm mb-1.5 group-hover:text-brand-800 transition">
                  {category.title}
                </h3>

                {/* تعداد دوره */}
                <div className="text-xs text-slate-500">
                  {toPersianNumber(category.coursesCount)} دوره
                </div>

                {/* فلش */}
                <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow">
                    <svg
                      className="w-3 h-3 text-brand-800"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* دکمه مشاهده همه */}
        <div className="text-center mt-12">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-brand-800 text-brand-800 font-bold hover:bg-brand-800 hover:text-white transition"
          >
            مشاهده همه دوره‌ها
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}