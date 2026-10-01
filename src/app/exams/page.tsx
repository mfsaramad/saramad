'use client';

import { useState, useMemo } from 'react';
import {
  Clock,
  Award,
  Users,
  CheckCircle2,
  Target,
  FileText,
  Zap,
  TrendingUp,
  ClipboardList,
} from 'lucide-react';
import { toPersianNumber, formatPrice } from '@/lib/format';

type FilterType = 'all' | 'free' | 'level' | 'mock';

const exams = [
  {
    id: '1',
    title: 'آزمون تعیین سطح برنامه‌نویسی',
    description:
      'سطح دانش خود را در برنامه‌نویسی بسنجید و مسیر یادگیری مناسب را انتخاب کنید',
    type: 'level',
    typeLabel: 'تعیین سطح',
    icon: Target,
    color: 'brand' as const,
    questions: 30,
    duration: 45,
    level: 'مقدماتی تا پیشرفته',
    price: 0,
    participants: 3240,
    rating: 4.9,
  },
  {
    id: '2',
    title: 'آزمون آزمایشی فنی و حرفه‌ای',
    description: 'خودت را در شرایط واقعی آزمون قرار بده و آماده شو',
    type: 'mock',
    typeLabel: 'آزمایشی',
    icon: ClipboardList,
    color: 'teal' as const,
    questions: 60,
    duration: 90,
    level: 'متوسط',
    price: 150000,
    participants: 1890,
    rating: 4.8,
  },
  {
    id: '3',
    title: 'آزمون تعیین سطح زبان انگلیسی',
    description: 'سطح زبان خود را بسنجید و کلاس مناسب را انتخاب کنید',
    type: 'level',
    typeLabel: 'تعیین سطح',
    icon: Target,
    color: 'accent' as const,
    questions: 40,
    duration: 50,
    level: 'همه سطوح',
    price: 0,
    participants: 4520,
    rating: 4.9,
  },
  {
    id: '4',
    title: 'آزمون پایانی دوره حسابداری',
    description: 'آزمون جامع پایان دوره حسابداری با صدور مدرک معتبر',
    type: 'mock',
    typeLabel: 'پایان دوره',
    icon: Award,
    color: 'brand' as const,
    questions: 50,
    duration: 75,
    level: 'پیشرفته',
    price: 200000,
    participants: 890,
    rating: 4.7,
  },
  {
    id: '5',
    title: 'آزمون رایگان مهارت‌های کامپیوتری',
    description: 'سطح مهارت‌های پایه کامپیوتری خود را محک بزنید',
    type: 'free',
    typeLabel: 'رایگان',
    icon: Zap,
    color: 'teal' as const,
    questions: 25,
    duration: 30,
    level: 'مقدماتی',
    price: 0,
    participants: 6780,
    rating: 4.8,
  },
  {
    id: '6',
    title: 'آزمون آزمایشی گرافیک و طراحی',
    description: 'دانش خود را در زمینه گرافیک و طراحی محک بزنید',
    type: 'mock',
    typeLabel: 'آزمایشی',
    icon: FileText,
    color: 'accent' as const,
    questions: 35,
    duration: 60,
    level: 'متوسط',
    price: 120000,
    participants: 1240,
    rating: 4.8,
  },
];

const tabs: { id: FilterType; label: string; icon: string }[] = [
  { id: 'all', label: 'همه آزمون‌ها', icon: '📝' },
  { id: 'free', label: 'رایگان', icon: '🎁' },
  { id: 'level', label: 'تعیین سطح', icon: '🎯' },
  { id: 'mock', label: 'آزمایشی', icon: '📋' },
];

export default function ExamsPage() {
  const [activeTab, setActiveTab] = useState<FilterType>('all');

  const filteredExams = useMemo(() => {
    if (activeTab === 'all') return exams;
    return exams.filter((e) => e.type === activeTab);
  }, [activeTab]);

  const colorMap = {
    brand: {
      bg: 'bg-blue-100',
      icon: 'text-blue-800',
      gradient: 'from-[#1e3a8a] to-[#1e40af]',
      hoverBorder: 'hover:border-blue-800',
    },
    teal: {
      bg: 'bg-teal-100',
      icon: 'text-teal-600',
      gradient: 'from-teal-500 to-teal-700',
      hoverBorder: 'hover:border-teal-500',
    },
    accent: {
      bg: 'bg-orange-100',
      icon: 'text-orange-600',
      gradient: 'from-orange-500 to-orange-700',
      hoverBorder: 'hover:border-orange-500',
    },
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* ===== هدر صفحه ===== */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#0d9488] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur border border-white/20 rounded-full text-white text-sm font-bold mb-5">
              📝 آزمون‌های آنلاین سرآمد
            </div>

            <h1 className="text-4xl lg:text-5xl font-black text-white mb-4">
              خودت را محک بزن!
            </h1>

            <p className="text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed mb-8">
              با آزمون‌های آنلاین سرآمد، سطح دانش خود را بسنج و مسیر پیشرفتت را
              هموار کن
            </p>

            {/* آمار */}
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-4">
                <ClipboardList className="w-6 h-6 text-teal-400 mx-auto mb-2" />
                <div className="text-2xl font-black text-white">۲۵۰+</div>
                <div className="text-xs text-blue-200 mt-1">آزمون آنلاین</div>
              </div>
              <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-4">
                <TrendingUp className="w-6 h-6 text-teal-400 mx-auto mb-2" />
                <div className="text-2xl font-black text-white">۱۵٬۰۰۰+</div>
                <div className="text-xs text-blue-200 mt-1">شرکت‌کننده</div>
              </div>
              <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-4">
                <Zap className="w-6 h-6 text-teal-400 mx-auto mb-2" />
                <div className="text-2xl font-black text-white">۹۸٪</div>
                <div className="text-xs text-blue-200 mt-1">رضایت</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== محتوای اصلی ===== */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* تب‌های فیلتر */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex items-center gap-1 p-1.5 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-x-auto no-scrollbar max-w-full">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white shadow-md'
                      : 'text-slate-600 hover:text-brand-800 hover:bg-slate-50'
                  }`}
                >
                  <span>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* نتیجه */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-slate-600">
              <span className="font-bold text-brand-800">
                {toPersianNumber(filteredExams.length)}
              </span>{' '}
              آزمون یافت شد
            </p>
          </div>

          {/* شبکه آزمون‌ها */}
          {filteredExams.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExams.map((exam) => {
                const Icon = exam.icon;
                const colors = colorMap[exam.color];

                return (
                  <div
                    key={exam.id}
                    className={`group bg-white rounded-3xl border-2 border-slate-100 ${
                      colors.hoverBorder
                    } hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden`}
                  >
                    {/* بخش بالا */}
                    <div className="p-7 pb-5">
                      <div className="flex items-start justify-between mb-5">
                        <div
                          className={`w-14 h-14 rounded-2xl ${colors.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}
                        >
                          <Icon className={`w-7 h-7 ${colors.icon}`} />
                        </div>

                        {/* برچسب رایگان/قیمت */}
                        {exam.price === 0 ? (
                          <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-black">
                            🎁 رایگان
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-black">
                            {formatPrice(exam.price)}
                          </span>
                        )}
                      </div>

                      {/* نوع */}
                      <div className="text-xs font-bold text-brand-700 mb-2">
                        {exam.typeLabel}
                      </div>

                      {/* عنوان */}
                      <h3 className="text-lg font-black text-slate-800 leading-snug mb-3 line-clamp-2 min-h-[3.5rem]">
                        {exam.title}
                      </h3>

                      {/* توضیح */}
                      <p className="text-sm text-slate-600 leading-relaxed line-clamp-2 min-h-[2.5rem] mb-4">
                        {exam.description}
                      </p>

                      {/* اطلاعات */}
                      <div className="grid grid-cols-3 gap-2 text-xs text-slate-600 pb-4 border-b border-slate-100">
                        <div className="flex items-center gap-1">
                          <ClipboardList className="w-3.5 h-3.5 text-brand-700" />
                          <span>{toPersianNumber(exam.questions)} سوال</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-brand-700" />
                          <span>{toPersianNumber(exam.duration)} دقیقه</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-brand-700" />
                          <span>{toPersianNumber(exam.participants)}</span>
                        </div>
                      </div>
                    </div>

                    {/* بخش پایین */}
                    <div className="px-7 pb-7 pt-5">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1 text-xs">
                          <Award className="w-3.5 h-3.5 text-yellow-500" />
                          <span className="font-bold text-slate-700">
                            {exam.rating.toLocaleString('fa-IR')}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500">
                          سطح: {exam.level}
                        </div>
                      </div>

                      <button
                        className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-white bg-gradient-to-l ${colors.gradient} hover:shadow-lg transition-all`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        شرکت در آزمون
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-100">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-black text-slate-800 mb-2">
                آزمونی یافت نشد
              </h3>
              <p className="text-slate-500 mb-6">فیلتر دیگری را انتخاب کنید</p>
              <button
                onClick={() => setActiveTab('all')}
                className="px-6 py-3 bg-brand-800 text-white rounded-xl font-bold hover:bg-brand-900 transition"
              >
                نمایش همه آزمون‌ها
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}