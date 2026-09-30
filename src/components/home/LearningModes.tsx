import Link from 'next/link';
import { Check, ArrowLeft } from 'lucide-react';
import { LEARNING_MODES } from '@/lib/constants';
import SectionTitle from '@/components/shared/SectionTitle';
import { cn } from '@/lib/utils';

export default function LearningModes() {
  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="نحوه یادگیری"
          title="چطور می‌خواهی یاد بگیری؟"
          description="سه مسیر برای یادگیری در سرآمد؛ هر کدام را که مناسب سبک زندگی و اهدافت است انتخاب کن"
        />

        <div className="grid md:grid-cols-3 gap-6">
          {LEARNING_MODES.map((mode, index) => {
            const isFeatured = mode.featured;

            return (
              <div
                key={mode.id}
                className={cn(
                  'group relative rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2',
                  isFeatured
                    ? 'bg-gradient-to-br from-brand-800 to-brand-900 text-white shadow-2xl lg:scale-105'
                    : 'bg-white shadow-sm hover:shadow-2xl border-2 border-transparent'
                )}
              >
                {/* برچسب محبوب‌ترین */}
                {isFeatured && (
                  <div className="absolute top-5 left-5 px-3 py-1 bg-orange-500 rounded-full text-xs font-black">
                    محبوب‌ترین
                  </div>
                )}

                {/* افکت تزئینی */}
                {isFeatured && (
                  <div className="absolute -top-10 -left-10 w-40 h-40 bg-teal-500/20 rounded-full blur-3xl" />
                )}

                <div className="relative">
                  {/* آیکون */}
                  <div
                    className={cn(
                      'w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110',
                      isFeatured
                        ? 'bg-white/10 backdrop-blur border border-white/20'
                        : mode.id === 'in-person'
                        ? 'bg-gradient-to-br from-brand-700 to-brand-900 shadow-xl shadow-blue-900/30'
                        : 'bg-gradient-to-br from-orange-400 to-orange-600 shadow-xl shadow-orange-500/30'
                    )}
                  >
                    <span className="text-4xl">{mode.icon}</span>
                  </div>

                  {/* عنوان */}
                  <h3
                    className={cn(
                      'text-2xl font-black mb-3',
                      isFeatured ? 'text-white' : 'text-slate-800'
                    )}
                  >
                    {mode.title}
                  </h3>

                  {/* توضیح */}
                  <p
                    className={cn(
                      'leading-relaxed mb-6 text-sm',
                      isFeatured ? 'text-blue-100' : 'text-slate-600'
                    )}
                  >
                    {mode.description}
                  </p>

                  {/* ویژگی‌ها */}
                  <ul className="space-y-2.5 mb-7">
                    {mode.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className={cn(
                          'flex items-center gap-2 text-sm',
                          isFeatured ? 'text-blue-50' : 'text-slate-700'
                        )}
                      >
                        <Check
                          className={cn(
                            'w-5 h-5 flex-shrink-0',
                            isFeatured ? 'text-teal-400' : 'text-teal-500'
                          )}
                          strokeWidth={3}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* دکمه */}
                  <Link
                    href={mode.href}
                    className={cn(
                      'inline-flex items-center gap-2 font-bold transition-all hover:gap-3',
                      isFeatured
                        ? 'text-teal-400'
                        : mode.id === 'in-person'
                        ? 'text-brand-800'
                        : 'text-orange-600'
                    )}
                  >
                    مشاهده دوره‌ها
                    <ArrowLeft className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}