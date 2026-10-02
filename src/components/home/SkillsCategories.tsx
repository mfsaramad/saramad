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
import FadeIn from '@/components/animations/FadeIn';

const iconMap = {
  code: Code2,
  palette: Palette,
  calculator: Calculator,
  languages: Languages,
  music: Music,
  briefcase: Briefcase,
};

const colorMap = {
  brand: {
    iconBg: 'bg-brand-100',
    hoverIconBg: 'group-hover:bg-brand-800',
    iconColor: 'text-brand-800',
    hoverIconColor: 'group-hover:text-white',
    border: 'hover:border-brand-800',
  },
  teal: {
    iconBg: 'bg-teal-100',
    hoverIconBg: 'group-hover:bg-teal-500',
    iconColor: 'text-teal-600',
    hoverIconColor: 'group-hover:text-white',
    border: 'hover:border-teal-500',
  },
  accent: {
    iconBg: 'bg-orange-100',
    hoverIconBg: 'group-hover:bg-orange-500',
    iconColor: 'text-orange-600',
    hoverIconColor: 'group-hover:text-white',
    border: 'hover:border-orange-500',
  },
};

export default function SkillsCategories() {
  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="دسته‌بندی مهارت‌ها"
          title="در چه زمینه‌ای می‌خواهی حرفه‌ای شوی؟"
          description="در هر زمینه‌ای که علاقه داری، سرآمد کنارت است تا مسیر حرفه‌ای شدن را طی کنی"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {skillCategories.map((category, index) => {
            const Icon = iconMap[category.icon as keyof typeof iconMap];
            const colors = colorMap[category.color as keyof typeof colorMap];

            return (
              <FadeIn key={category.id} delay={index * 0.08} direction="up">
                <Link
                  href={category.href}
                  className={`group relative bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border-2 border-transparent ${colors.border} block`}
                >
                  <div
                    className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 ${colors.iconBg} ${colors.hoverIconBg}`}
                  >
                    <Icon
                      className={`w-7 h-7 transition-colors duration-300 ${colors.iconColor} ${colors.hoverIconColor}`}
                      strokeWidth={2}
                    />
                  </div>

                  <h3 className="font-black text-slate-800 dark:text-slate-100 text-sm mb-1.5 group-hover:text-brand-800 dark:group-hover:text-brand-300 transition">
                    {category.title}
                  </h3>

                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {toPersianNumber(category.coursesCount)} دوره
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.5}>
          <div className="text-center mt-12">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-brand-800 dark:border-brand-300 text-brand-800 dark:text-brand-300 font-bold hover:bg-brand-800 dark:hover:bg-brand-300 hover:text-white dark:hover:text-brand-800 transition"
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
        </FadeIn>
      </div>
    </section>
  );
}