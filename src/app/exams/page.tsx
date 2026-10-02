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
  Sparkles,
  PlayCircle,
} from 'lucide-react';
import { toPersianNumber, formatPrice } from '@/lib/format';
import ExamModal from '@/components/exams/ExamModal';
import FadeIn from '@/components/animations/FadeIn';
import { cn } from '@/lib/utils';

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
    examData: {
      id: '1',
      title: 'آزمون تعیین سطح برنامه‌نویسی',
      description: 'سطح دانش خود را در برنامه‌نویسی بسنجید',
      duration: 45,
      level: 'مقدماتی تا پیشرفته',
      icon: '💻',
      questions: [
        {
          id: 1,
          question: 'زبان پایتون در چه سالی معرفی شد؟',
          options: ['۱۹۸۹', '۱۹۹۱', '۱۹۹۵', '۲۰۰۰'],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: 'کدام یک از موارد زیر یک نوع داده در پایتون نیست؟',
          options: ['List', 'Tuple', 'Array', 'Dictionary'],
          correctAnswer: 2,
        },
        {
          id: 3,
          question: 'خروجی دستور print(2 ** 3) چیست؟',
          options: ['6', '8', '9', '23'],
          correctAnswer: 1,
        },
        {
          id: 4,
          question:
            'در جاوااسکریپت، کدام کلمه کلیدی برای تعریف متغیر با قابلیت تغییر استفاده می‌شود؟',
          options: ['const', 'let', 'final', 'static'],
          correctAnswer: 1,
        },
        {
          id: 5,
          question: 'HTML مخفف چیست؟',
          options: [
            'Hyper Text Markup Language',
            'High Tech Modern Language',
            'Hyper Transfer Markup Language',
            'Home Tool Markup Language',
          ],
          correctAnswer: 0,
        },
      ],
    },
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
    examData: {
      id: '2',
      title: 'آزمون آزمایشی فنی و حرفه‌ای',
      description: 'خودت را در شرایط واقعی آزمون قرار بده',
      duration: 90,
      level: 'متوسط',
      icon: '📋',
      questions: [
        {
          id: 1,
          question: 'کدام یک از موارد زیر یک سیستم‌عامل نیست؟',
          options: ['Windows', 'Linux', 'macOS', 'Photoshop'],
          correctAnswer: 3,
        },
        {
          id: 2,
          question: 'واحد اندازه‌گیری سرعت اینترنت چیست؟',
          options: ['مگابایت', 'مگابیت', 'گیگابایت', 'کیلوبایت'],
          correctAnswer: 1,
        },
        {
          id: 3,
          question: 'کدام یک از موارد زیر نرم‌افزار گرافیکی است؟',
          options: ['Excel', 'Word', 'Photoshop', 'PowerPoint'],
          correctAnswer: 2,
        },
      ],
    },
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
    examData: {
      id: '3',
      title: 'آزمون تعیین سطح زبان انگلیسی',
      description: 'سطح زبان خود را بسنجید',
      duration: 50,
      level: 'همه سطوح',
      icon: '🌍',
      questions: [
        {
          id: 1,
          question: 'معنی کلمه "Book" چیست؟',
          options: ['کتاب', 'دفتر', 'قلم', 'میز'],
          correctAnswer: 0,
        },
        {
          id: 2,
          question: 'کدام گزینه صحیح است؟ I ___ a student.',
          options: ['is', 'am', 'are', 'be'],
          correctAnswer: 1,
        },
        {
          id: 3,
          question: 'گذشته فعل "go" چیست؟',
          options: ['goed', 'gone', 'went', 'going'],
          correctAnswer: 2,
        },
      ],
    },
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
    examData: {
      id: '4',
      title: 'آزمون پایانی دوره حسابداری',
      description: 'آزمون جامع پایان دوره حسابداری',
      duration: 75,
      level: 'پیشرفته',
      icon: '🧮',
      questions: [
        {
          id: 1,
          question: 'معادله اصلی حسابداری چیست؟',
          options: [
            'دارایی = بدهی + سرمایه',
            'دارایی = بدهی - سرمایه',
            'سرمایه = دارایی + بدهی',
            'بدهی = دارایی + سرمایه',
          ],
          correctAnswer: 0,
        },
        {
          id: 2,
          question: 'کدام یک از موارد زیر جزء دارایی‌ها نیست؟',
          options: ['نقد', 'بانک', 'حساب‌های پرداختنی', 'موجودی کالا'],
          correctAnswer: 2,
        },
      ],
    },
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
    examData: {
      id: '5',
      title: 'آزمون رایگان مهارت‌های کامپیوتری',
      description: 'سطح مهارت‌های پایه کامپیوتری خود را محک بزنید',
      duration: 30,
      level: 'مقدماتی',
      icon: '💻',
      questions: [
        {
          id: 1,
          question: 'کدام کلید برای کپی استفاده می‌شود؟',
          options: ['Ctrl + V', 'Ctrl + C', 'Ctrl + X', 'Ctrl + Z'],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: 'کدام یک سیستم‌عامل است؟',
          options: ['Word', 'Excel', 'Windows', 'Photoshop'],
          correctAnswer: 2,
        },
        {
          id: 3,
          question: 'RAM مخفف چیست؟',
          options: [
            'Random Access Memory',
            'Read Access Memory',
            'Rapid Access Memory',
            'Real Access Memory',
          ],
          correctAnswer: 0,
        },
      ],
    },
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
    examData: {
      id: '6',
      title: 'آزمون آزمایشی گرافیک و طراحی',
      description: 'دانش خود را در زمینه گرافیک و طراحی محک بزنید',
      duration: 60,
      level: 'متوسط',
      icon: '🎨',
      questions: [
        {
          id: 1,
          question: 'کدام نرم‌افزار برای طراحی گرافیکی استفاده می‌شود؟',
          options: ['Excel', 'Photoshop', 'Word', 'Notepad'],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: 'RGB مخفف چیست؟',
          options: [
            'Red Green Blue',
            'Red Gray Black',
            'Random Green Blue',
            'Red Gold Blue',
          ],
          correctAnswer: 0,
        },
      ],
    },
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
  const [selectedExam, setSelectedExam] = useState<typeof exams[0] | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredExams = useMemo(() => {
    if (activeTab === 'all') return exams;
    return exams.filter((e) => e.type === activeTab);
  }, [activeTab]);

  const handleOpenExam = (exam: typeof exams[0]) => {
    setSelectedExam(exam);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedExam(null), 300);
  };

  const colorMap = {
    brand: {
      bg: 'bg-blue-100 dark:bg-blue-950/50',
      icon: 'text-blue-800 dark:text-blue-300',
      gradient: 'from-[#1e3a8a] to-[#1e40af]',
      hoverBorder: 'hover:border-blue-800 dark:hover:border-blue-300',
      shadow: 'shadow-blue-900/30',
    },
    teal: {
      bg: 'bg-teal-100 dark:bg-teal-950/50',
      icon: 'text-teal-600 dark:text-teal-300',
      gradient: 'from-teal-500 to-teal-700',
      hoverBorder: 'hover:border-teal-500 dark:hover:border-teal-300',
      shadow: 'shadow-teal-500/30',
    },
    accent: {
      bg: 'bg-orange-100 dark:bg-orange-950/50',
      icon: 'text-orange-600 dark:text-orange-300',
      gradient: 'from-orange-500 to-orange-700',
      hoverBorder: 'hover:border-orange-500 dark:hover:border-orange-300',
      shadow: 'shadow-orange-500/30',
    },
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
      {/* ===== هدر صفحه ===== */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#0d9488] overflow-hidden">
        {/* الگوی نقطه‌ای */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />

        {/* افکت‌های تزئینی */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur border border-white/20 rounded-full text-white text-sm font-bold mb-5">
                <Sparkles className="w-4 h-4 text-orange-300" />
                <span>آزمون‌های آنلاین سرآمد</span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-black text-white mb-4">
                خودت را محک بزن!
              </h1>

              <p className="text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed mb-8">
                با آزمون‌های آنلاین سرآمد، سطح دانش خود را بسنج و مسیر پیشرفتت
                را هموار کن
              </p>
            </div>
          </FadeIn>

          {/* آمار */}
          <FadeIn delay={0.15}>
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="group bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-4 lg:p-5 hover:bg-white/15 hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <ClipboardList className="w-5 h-5 lg:w-6 lg:h-6 text-teal-400" />
                </div>
                <div className="text-2xl lg:text-3xl font-black text-white">
                  ۲۵۰+
                </div>
                <div className="text-xs text-blue-200 mt-1">آزمون آنلاین</div>
              </div>

              <div className="group bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-4 lg:p-5 hover:bg-white/15 hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 text-teal-400" />
                </div>
                <div className="text-2xl lg:text-3xl font-black text-white">
                  ۱۵٬۰۰۰+
                </div>
                <div className="text-xs text-blue-200 mt-1">شرکت‌کننده</div>
              </div>

              <div className="group bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-4 lg:p-5 hover:bg-white/15 hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Zap className="w-5 h-5 lg:w-6 lg:h-6 text-teal-400" />
                </div>
                <div className="text-2xl lg:text-3xl font-black text-white">
                  ۹۸٪
                </div>
                <div className="text-xs text-blue-200 mt-1">رضایت</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== محتوای اصلی ===== */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* تب‌ها */}
          <FadeIn>
            <div className="flex justify-center mb-10">
              <div className="inline-flex items-center gap-1 p-1.5 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-x-auto no-scrollbar max-w-full">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      'flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all',
                      activeTab === tab.id
                        ? 'bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white shadow-md'
                        : 'text-slate-600 dark:text-slate-400 hover:text-brand-800 dark:hover:text-brand-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    )}
                  >
                    <span>{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* نتیجه */}
          <FadeIn>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                <span className="font-bold text-brand-800 dark:text-brand-300">
                  {toPersianNumber(filteredExams.length)}
                </span>{' '}
                آزمون یافت شد
              </p>
            </div>
          </FadeIn>

          {/* شبکه آزمون‌ها */}
          {filteredExams.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExams.map((exam, index) => {
                const Icon = exam.icon;
                const colors = colorMap[exam.color];

                return (
                  <FadeIn
                    key={exam.id}
                    delay={index * 0.1}
                    direction="up"
                    className="h-full"
                  >
                    <div
                      className={cn(
                        'group relative h-full bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-100 dark:border-slate-800',
                        colors.hoverBorder,
                        'hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 overflow-hidden'
                      )}
                    >
                      {/* بخش بالا */}
                      <div className="p-7 pb-5">
                        <div className="flex items-start justify-between mb-5">
                          <div
                            className={cn(
                              'w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6',
                              colors.bg
                            )}
                          >
                            <Icon className={cn('w-7 h-7', colors.icon)} />
                          </div>

                          {exam.price === 0 ? (
                            <span className="px-3 py-1 bg-teal-100 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300 rounded-full text-xs font-black">
                              🎁 رایگان
                            </span>
                          ) : (
                            <span className="px-3 py-1 bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300 rounded-full text-xs font-black">
                              {formatPrice(exam.price)}
                            </span>
                          )}
                        </div>

                        <div className="text-xs font-bold text-brand-700 dark:text-brand-300 mb-2">
                          {exam.typeLabel}
                        </div>

                        <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 leading-snug mb-3 line-clamp-2 min-h-[3.5rem] group-hover:text-brand-800 dark:group-hover:text-brand-300 transition">
                          {exam.title}
                        </h3>

                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2 min-h-[2.5rem] mb-4">
                          {exam.description}
                        </p>

                        <div className="grid grid-cols-3 gap-2 text-xs text-slate-600 dark:text-slate-400 pb-4 border-b border-slate-100 dark:border-slate-800">
                          <div className="flex items-center gap-1">
                            <ClipboardList className="w-3.5 h-3.5 text-brand-700 dark:text-brand-300" />
                            <span>
                              {toPersianNumber(exam.questions)} سوال
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-brand-700 dark:text-brand-300" />
                            <span>
                              {toPersianNumber(exam.duration)} دقیقه
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-3.5 h-3.5 text-brand-700 dark:text-brand-300" />
                            <span>
                              {toPersianNumber(exam.participants)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* بخش پایین */}
                      <div className="px-7 pb-7 pt-5">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-1 text-xs">
                            <Award className="w-3.5 h-3.5 text-yellow-500" />
                            <span className="font-bold text-slate-700 dark:text-slate-300">
                              {exam.rating.toLocaleString('fa-IR')}
                            </span>
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            سطح: {exam.level}
                          </div>
                        </div>

                        <button
                          onClick={() => handleOpenExam(exam)}
                          className={cn(
                            'flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-white bg-gradient-to-l',
                            colors.gradient,
                            'hover:shadow-lg transition-all hover:gap-3'
                          )}
                        >
                          <PlayCircle className="w-4 h-4" />
                          شرکت در آزمون
                        </button>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          ) : (
            <FadeIn>
              <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-2">
                  آزمونی یافت نشد
                </h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6">
                  فیلتر دیگری را انتخاب کنید
                </p>
                <button
                  onClick={() => setActiveTab('all')}
                  className="px-6 py-3 bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white rounded-xl font-bold hover:shadow-lg transition"
                >
                  نمایش همه آزمون‌ها
                </button>
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-12 lg:py-16 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-10 lg:p-14 text-center text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />

              <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, white 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              />

              <div className="relative">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center mb-6">
                  <Award className="w-10 h-10 text-teal-400" />
                </div>

                <h2 className="text-3xl lg:text-4xl font-black mb-4">
                  آماده‌ای خودت را محک بزنی؟
                </h2>
                <p className="text-blue-100 max-w-2xl mx-auto mb-8 leading-relaxed">
                  با شرکت در آزمون‌های آنلاین سرآمد، سطح دانش خودت رو بسنج و
                  مدرک معتبر دریافت کن
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() =>
                      filteredExams[0] && handleOpenExam(filteredExams[0])
                    }
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-orange-500 hover:bg-orange-600 rounded-xl font-black shadow-xl shadow-orange-500/30 hover:scale-105 transition-all"
                  >
                    <PlayCircle className="w-5 h-5" />
                    شروع آزمون
                  </button>
                  <a
                    href="https://t.me/saramad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 rounded-xl font-bold transition"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    عضویت در تلگرام
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== Modal آزمون ===== */}
      <ExamModal
        exam={selectedExam?.examData || null}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}