import Link from 'next/link';
import { ClipboardList, Clock, Award, Zap, ArrowLeft, Target, TrendingUp } from 'lucide-react';
import SectionTitle from '@/components/shared/SectionTitle';
import { cn } from '@/lib/utils';

/* داده نمونه آزمون‌ها */
const examFeatures = [
  {
    id: '1',
    title: 'آزمون تعیین سطح',
    description: 'سطح دانش خود را بسنج و مسیر یادگیری مناسب را انتخاب کن',
    icon: Target,
    color: 'brand' as const,
    examsCount: 12,
    isFree: true,
  },
  {
    id: '2',
    title: 'آزمون‌های آزمایشی',
    description: 'خودت را در شرایط واقعی آزمون قرار بده و آماده شو',
    icon: ClipboardList,
    color: 'teal' as const,
    examsCount: 45,
    isFree: false,
  },
  {
    id: '3',
    title: 'آزمون‌های پایان دوره',
    description: 'مدرک معتبر سرآمد را با موفقیت در آزمون دریافت کن',
    icon: Award,
    color: 'accent' as const,
    examsCount: 80,
    isFree: false,
  },
];

const examStats = [
  { value: '۲۵۰+', label: 'آزمون آنلاین', icon: ClipboardList },
  { value: '۱۵٬۰۰۰+', label: 'شرکت‌کننده', icon: TrendingUp },
  { value: '۹۸٪', label: 'رضایت', icon: Zap },
];

export default function OnlineExams() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="آزمون آنلاین"
          title="خودت را محک بزن!"
          description="با آزمون‌های آنلاین سرآمد، سطح دانش خود را بسنج و مسیر پیشرفتت را هموار کن"
        />

        {/* آمار بالای بخش */}
        <div className="grid grid-cols-3 gap-4 mb-12 max-w-3xl mx-auto">
          {examStats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="text-center p-5 bg-slate-50 rounded-2xl border border-slate-100"
              >
                <div className="w-10 h-10 mx-auto rounded-xl bg-brand-100 flex items-center justify-center mb-2">
                  <Icon className="w-5 h-5 text-brand-800" />
                </div>
                <div className="text-xl font-black text-brand-800">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* کارت‌های آزمون */}
        <div className="grid md:grid-cols-3 gap-6">
          {examFeatures.map((exam) => {
            const Icon = exam.icon;
            const colorClasses = {
              brand: {
                bg: 'from-brand-700 to-brand-900',
                iconBg: 'bg-brand-100',
                iconColor: 'text-brand-800',
                shadow: 'shadow-brand-800/20',
              },
              teal: {
                bg: 'from-teal-500 to-teal-700',
                iconBg: 'bg-teal-100',
                iconColor: 'text-teal-600',
                shadow: 'shadow-teal-500/20',
              },
              accent: {
                bg: 'from-orange-500 to-orange-700',
                iconBg: 'bg-orange-100',
                iconColor: 'text-orange-600',
                shadow: 'shadow-orange-500/20',
              },
            }[exam.color];

            return (
              <div
                key={exam.id}
                className="group bg-white rounded-3xl p-7 border-2 border-slate-100 hover:border-brand-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                {/* آیکون */}
                <div
                  className={cn(
                    'w-16 h-16 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110',
                    colorClasses.iconBg
                  )}
                >
                  <Icon
                    className={cn('w-8 h-8', colorClasses.iconColor)}
                    strokeWidth={2}
                  />
                </div>

                {/* عنوان */}
                <h3 className="text-xl font-black text-slate-800 mb-3">
                  {exam.title}
                </h3>

                {/* توضیح */}
                <p className="text-sm text-slate-600 leading-relaxed mb-5 min-h-[3rem]">
                  {exam.description}
                </p>

                {/* اطلاعات */}
                <div className="flex items-center justify-between mb-6 pb-5 border-b border-slate-100">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <ClipboardList className="w-4 h-4 text-brand-700" />
                    <span className="font-bold">
                      {exam.examsCount} آزمون
                    </span>
                  </div>
                  {exam.isFree && (
                    <span className="px-2.5 py-0.5 bg-teal-100 text-teal-700 rounded-full text-xs font-black">
                      رایگان
                    </span>
                  )}
                </div>

                {/* دکمه */}
                <Link
                  href="/exams"
                  className={cn(
                    'flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold transition-all bg-gradient-to-l text-white',
                    colorClasses.bg,
                    'hover:shadow-lg',
                    colorClasses.shadow
                  )}
                >
                  مشاهده آزمون‌ها
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}