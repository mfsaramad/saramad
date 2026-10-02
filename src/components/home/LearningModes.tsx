import Link from 'next/link';
import { Check, ArrowLeft, Building2, Monitor, RefreshCw } from 'lucide-react';
import { LEARNING_MODES } from '@/lib/constants';
import SectionTitle from '@/components/shared/SectionTitle';
import FadeIn from '@/components/animations/FadeIn';

const iconMap = {
  '🏢': Building2,
  '💻': Monitor,
  '🔄': RefreshCw,
};

export default function LearningModes() {
  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="نحوه یادگیری"
          title="چطور می‌خواهی یاد بگیری؟"
          description="سه مسیر برای یادگیری در سرآمد؛ هر کدام را که مناسب سبک زندگی و اهدافت است انتخاب کن"
        />

        <div className="grid md:grid-cols-3 gap-6">
          {LEARNING_MODES.map((mode, index) => {
            const isFeatured = mode.featured;
            const Icon = iconMap[mode.icon as keyof typeof iconMap] || Building2;

            return (
              <FadeIn
                key={mode.id}
                delay={index * 0.15}
                direction="up"
                className="h-full"
              >
                <div
                  className={
                    isFeatured
                      ? 'group relative h-full rounded-3xl p-8 transition-all duration-500 hover:-translate-y-3 bg-gradient-to-br from-[#1e3a8a] to-[#0d9488] text-white shadow-2xl lg:scale-105 lg:hover:scale-[1.07] overflow-hidden'
                      : 'group relative h-full rounded-3xl p-8 transition-all duration-500 hover:-translate-y-3 bg-slate-50 dark:bg-slate-800 shadow-sm hover:shadow-2xl border-2 border-transparent hover:border-brand-800 dark:hover:border-brand-300 overflow-hidden'
                  }
                >
                  {/* افکت تزئینی برای کارت ویژه */}
                  {isFeatured && (
                    <>
                      <div className="absolute -top-20 -left-20 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl" />
                      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-orange-400/20 rounded-full blur-3xl" />
                    </>
                  )}

                  {/* برچسب محبوب‌ترین */}
                  {isFeatured && (
                    <div className="absolute top-5 left-5 px-3 py-1 bg-orange-500 rounded-full text-xs font-black shadow-lg">
                      محبوب‌ترین
                    </div>
                  )}

                  <div className="relative">
                    {/* آیکون */}
                    <div
                      className={
                        isFeatured
                          ? 'w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 bg-white/10 backdrop-blur border border-white/20'
                          : mode.id === 'in-person'
                          ? 'w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] shadow-xl shadow-blue-900/30'
                          : 'w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 bg-gradient-to-br from-orange-400 to-orange-600 shadow-xl shadow-orange-500/30'
                      }
                    >
                      <Icon className="w-10 h-10 text-white" strokeWidth={2} />
                    </div>

                    {/* عنوان */}
                    <h3
                      className={
                        isFeatured
                          ? 'text-2xl font-black mb-3 text-white'
                          : 'text-2xl font-black mb-3 text-slate-800 dark:text-slate-100'
                      }
                    >
                      {mode.title}
                    </h3>

                    {/* توضیح */}
                    <p
                      className={
                        isFeatured
                          ? 'leading-relaxed mb-6 text-sm text-blue-100'
                          : 'leading-relaxed mb-6 text-sm text-slate-600 dark:text-slate-400'
                      }
                    >
                      {mode.description}
                    </p>

                    {/* ویژگی‌ها */}
                    <ul className="space-y-3 mb-7">
                      {mode.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className={
                            isFeatured
                              ? 'flex items-center gap-2 text-sm text-blue-50'
                              : 'flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300'
                          }
                        >
                          <div
                            className={
                              isFeatured
                                ? 'w-5 h-5 rounded-full bg-teal-400/20 flex items-center justify-center flex-shrink-0'
                                : 'w-5 h-5 rounded-full bg-teal-100 dark:bg-teal-950/50 flex items-center justify-center flex-shrink-0'
                            }
                          >
                            <Check
                              className={
                                isFeatured
                                  ? 'w-3 h-3 text-teal-300'
                                  : 'w-3 h-3 text-teal-600 dark:text-teal-400'
                              }
                              strokeWidth={3}
                            />
                          </div>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* دکمه */}
                    <Link
                      href={mode.href}
                      className={
                        isFeatured
                          ? 'inline-flex items-center gap-2 font-bold transition-all hover:gap-3 text-teal-300 hover:text-teal-200'
                          : mode.id === 'in-person'
                          ? 'inline-flex items-center gap-2 font-bold transition-all hover:gap-3 text-brand-800 dark:text-brand-300'
                          : 'inline-flex items-center gap-2 font-bold transition-all hover:gap-3 text-orange-600 dark:text-orange-400'
                      }
                    >
                      مشاهده دوره‌ها
                      <ArrowLeft className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}