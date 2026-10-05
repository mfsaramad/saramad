import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  Star,
  Users,
  Clock,
  Calendar,
  Award,
  CheckCircle2,
  BookOpen,
  GraduationCap,
  PlayCircle,
  ShoppingCart,
  Heart,
  Share2,
  Check,
  AlertCircle,
  Sparkles,
  TrendingUp,
  Target,
  BarChart3,
  Zap,
  Trophy,
  MessageSquare,
  ChevronDown,
  Layers,
  Video,
  FileText,
} from 'lucide-react';
import { courses, getCourseBySlug, getRelatedCourses } from '@/lib/data';
import {
  toPersianNumber,
  formatPrice,
  getModeLabel,
  getModeIcon,
  getLevelLabel,
} from '@/lib/format';
import CourseCard from '@/components/shared/CourseCard';
import InstructorCard from '@/components/shared/InstructorCard';
import StarRating from '@/components/shared/StarRating';
import FadeIn from '@/components/animations/FadeIn';
import { cn } from '@/lib/utils';

// ✅ برای Static Export
export function generateStaticParams() {
  return courses.map((course) => ({
    slug: course.slug,
  }));
}

interface CourseDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CourseDetailPage({
  params,
}: CourseDetailPageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const lowestPrice = Math.min(
    ...Object.values(course.price).filter((p): p is number => p !== undefined)
  );

  const relatedCourses = getRelatedCourses(course, 3);

  const courseLearnings = [
    'مبانی و مفاهیم پایه به‌صورت عملی',
    'پروژه‌های واقعی و کاربردی',
    'کار با ابزارهای حرفه‌ای روز دنیا',
    'آماده‌سازی کامل برای بازار کار',
    'رفع اشکال و پشتیبانی در طول دوره',
    'مدرک معتبر پایان دوره',
    'دسترسی مادام‌العمر به محتوا',
    'شبکه‌سازی با هم‌کلاسی‌ها',
  ];

  const curriculum = [
    {
      title: 'مقدمه و آشنایی',
      sessions: 3,
      duration: 6,
      topics: ['معرفی دوره', 'نصب ابزارها', 'اولین پروژه'],
    },
    {
      title: 'مبانی و اصول',
      sessions: 8,
      duration: 16,
      topics: ['مفاهیم پایه', 'تمرین‌های عملی', 'پروژه کوچک'],
    },
    {
      title: 'مباحث پیشرفته',
      sessions: 10,
      duration: 22,
      topics: ['تکنیک‌های حرفه‌ای', 'پروژه‌های واقعی', 'بهینه‌سازی'],
    },
    {
      title: 'پروژه نهایی و بازار کار',
      sessions: 9,
      duration: 18,
      topics: ['پروژه جامع', 'رزومه‌نویسی', 'مصاحبه شغلی'],
    },
  ];

  const colorMap = {
    brand: {
      bg: 'bg-blue-100 dark:bg-blue-950/50',
      icon: 'text-blue-800 dark:text-blue-300',
      gradient: 'from-[#1e3a8a] to-[#1e40af]',
      shadow: 'shadow-blue-900/30',
    },
    teal: {
      bg: 'bg-teal-100 dark:bg-teal-950/50',
      icon: 'text-teal-600 dark:text-teal-300',
      gradient: 'from-teal-500 to-teal-700',
      shadow: 'shadow-teal-500/30',
    },
    accent: {
      bg: 'bg-orange-100 dark:bg-orange-950/50',
      icon: 'text-orange-600 dark:text-orange-300',
      gradient: 'from-orange-500 to-orange-700',
      shadow: 'shadow-orange-500/30',
    },
  };

  const modeColorMap = {
    'in-person': colorMap.brand,
    online: colorMap.teal,
    hybrid: colorMap.accent,
  };

  const courseColor = modeColorMap[course.mode];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
      {/* ===== Hero ===== */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#0d9488] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />

        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <FadeIn>
            <div className="flex items-center gap-2 text-sm text-blue-100 mb-8 flex-wrap">
              <Link href="/" className="hover:text-white transition">
                خانه
              </Link>
              <span>/</span>
              <Link href="/courses" className="hover:text-white transition">
                دوره‌ها
              </Link>
              <span>/</span>
              <span className="text-white font-bold line-clamp-1">
                {course.title}
              </span>
            </div>
          </FadeIn>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* اطلاعات دوره */}
            <FadeIn className="lg:col-span-2">
              <div className="text-white">
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur border border-white/20 rounded-full text-xs font-bold">
                    {getModeIcon(course.mode)} {getModeLabel(course.mode)}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur border border-white/20 rounded-full text-xs font-bold">
                    🎯 {getLevelLabel(course.level)}
                  </span>
                  {course.certificate && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-500/90 rounded-full text-xs font-bold">
                      <Award className="w-3.5 h-3.5" />
                      مدرک معتبر
                    </span>
                  )}
                  {course.remainingCapacity <= 5 && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-500/90 rounded-full text-xs font-bold animate-pulse">
                      🔥 فقط {toPersianNumber(course.remainingCapacity)} نفر
                    </span>
                  )}
                </div>

                <h1 className="text-3xl lg:text-5xl font-black leading-tight mb-6">
                  {course.title}
                </h1>

                <p className="text-lg text-blue-100 leading-relaxed mb-8 max-w-2xl">
                  {course.description}
                </p>

                {/* اطلاعات سریع */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="flex items-center gap-3 group">
                    <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Clock className="w-5 h-5 text-teal-400" />
                    </div>
                    <div>
                      <div className="text-xs text-blue-200">مدت دوره</div>
                      <div className="font-black">
                        {toPersianNumber(course.duration)} ساعت
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 group">
                    <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <BookOpen className="w-5 h-5 text-teal-400" />
                    </div>
                    <div>
                      <div className="text-xs text-blue-200">جلسات</div>
                      <div className="font-black">
                        {toPersianNumber(course.sessions)} جلسه
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 group">
                    <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Users className="w-5 h-5 text-teal-400" />
                    </div>
                    <div>
                      <div className="text-xs text-blue-200">دانشجویان</div>
                      <div className="font-black">
                        {toPersianNumber(course.studentsCount)}+
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 group">
                    <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    </div>
                    <div>
                      <div className="text-xs text-blue-200">امتیاز</div>
                      <div className="font-black">
                        {course.rating.toLocaleString('fa-IR')} / ۵
                      </div>
                    </div>
                  </div>
                </div>

                {/* استاد */}
                <div className="flex items-center gap-3 mt-8 pt-6 border-t border-white/10">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-400 to-brand-500 flex items-center justify-center text-white text-xl font-black shadow-lg">
                    {course.instructor.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs text-blue-200">مدرس دوره</div>
                    <div className="font-black text-lg">
                      {course.instructor.name}
                    </div>
                    <div className="text-sm text-blue-100">
                      {course.instructor.title}
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* کارت خرید */}
            <FadeIn
              direction="left"
              delay={0.15}
              className="lg:sticky lg:top-24"
            >
              <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-6 lg:p-7">
                {/* قیمت */}
                <div className="mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                  <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                    شروع از
                  </div>
                  <div className="text-3xl font-black text-brand-800 dark:text-brand-300">
                    {formatPrice(lowestPrice)}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    بسته به نوع برگزاری
                  </div>
                </div>

                {/* اطلاعات سریع */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      شروع دوره
                    </span>
                    <span className="font-bold text-slate-800 dark:text-slate-100">
                      {course.startDate}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      زمان برگزاری
                    </span>
                    <span className="font-bold text-slate-800 dark:text-slate-100 text-xs">
                      {course.schedule}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      ظرفیت باقی‌مانده
                    </span>
                    <span
                      className={cn(
                        'font-bold',
                        course.remainingCapacity <= 5
                          ? 'text-red-600 dark:text-red-400'
                          : 'text-slate-800 dark:text-slate-100'
                      )}
                    >
                      {toPersianNumber(course.remainingCapacity)} نفر
                      {course.remainingCapacity <= 5 && ' 🔥'}
                    </span>
                  </div>
                </div>

                {/* دکمه‌های اقدام */}
                <div className="space-y-3 mb-6">
                  <Link
                    href={`/checkout?course=${course.slug}`}
                    className={cn(
                      'w-full flex items-center justify-center gap-2 py-4 rounded-xl font-black text-white bg-gradient-to-l',
                      courseColor.gradient,
                      'hover:shadow-xl transition-all hover:scale-[1.02] hover:gap-3'
                    )}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    ثبت‌نام در دوره
                  </Link>

                  <button className="w-full flex items-center justify-center gap-2 py-3.5 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-all hover:gap-3">
                    <PlayCircle className="w-5 h-5" />
                    مشاهده سرفصل‌ها
                  </button>
                </div>

                {/* مزایا */}
                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <CheckCircle2 className="w-5 h-5 text-teal-500 flex-shrink-0" />
                    پشتیبانی آنلاین در طول دوره
                  </div>
                  {course.certificate && (
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <CheckCircle2 className="w-5 h-5 text-teal-500 flex-shrink-0" />
                      صدور مدرک معتبر پایان دوره
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <CheckCircle2 className="w-5 h-5 text-teal-500 flex-shrink-0" />
                    دسترسی به ویدیوهای ضبط‌شده
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <CheckCircle2 className="w-5 h-5 text-teal-500 flex-shrink-0" />
                    امکان پرداخت اقساطی
                  </div>
                </div>

                {/* دکمه‌های کمکی */}
                <div className="flex items-center gap-2 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                  <button className="flex-1 flex items-center justify-center gap-1 py-2.5 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition">
                    <Heart className="w-4 h-4" />
                    ذخیره
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1 py-2.5 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition">
                    <Share2 className="w-4 h-4" />
                    اشتراک
                  </button>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ===== محتوای اصلی ===== */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* ستون چپ */}
            <div className="lg:col-span-2 space-y-6">
              {/* درباره دوره */}
              <FadeIn>
                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-8">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-brand-100 dark:bg-brand-950/50 flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-brand-800 dark:text-brand-300" />
                    </div>
                    <h2 className="text-xl font-black text-slate-800 dark:text-slate-100">
                      درباره این دوره
                    </h2>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    {course.description}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    این دوره با بهره‌گیری از اساتید مجرب و روش‌های آموزشی نوین،
                    شما را از سطح مبتدی تا حرفه‌ای همراهی می‌کند. با تمرکز بر
                    پروژه‌های عملی و کاربردی، پس از اتمام دوره آماده ورود به
                    بازار کار خواهید بود.
                  </p>
                </div>
              </FadeIn>

              {/* آنچه یاد می‌گیرید */}
              <FadeIn delay={0.1}>
                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-8">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-teal-100 dark:bg-teal-950/50 flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-teal-600 dark:text-teal-300" />
                    </div>
                    <h2 className="text-xl font-black text-slate-800 dark:text-slate-100">
                      آنچه در این دوره یاد می‌گیرید
                    </h2>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {courseLearnings.map((item, index) => (
                      <div
                        key={index}
                        className="group flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-teal-50 dark:hover:bg-teal-950/30 hover:shadow-md transition-all"
                      >
                        <div className="w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-950/50 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                          <Check
                            className="w-3.5 h-3.5 text-teal-600 dark:text-teal-300"
                            strokeWidth={3}
                          />
                        </div>
                        <span className="text-sm text-slate-700 dark:text-slate-300">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* سرفصل‌ها */}
              <FadeIn delay={0.15}>
                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-950/50 flex items-center justify-center">
                      <Layers className="w-6 h-6 text-orange-600 dark:text-orange-300" />
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-slate-800 dark:text-slate-100">
                        سرفصل‌های دوره
                      </h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {toPersianNumber(curriculum.length)} فصل •{' '}
                        {toPersianNumber(course.sessions)} جلسه •{' '}
                        {toPersianNumber(course.duration)} ساعت
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {curriculum.map((section, index) => (
                      <div
                        key={index}
                        className="bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden"
                      >
                        <div className="flex items-center justify-between p-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-800 to-teal-500 flex items-center justify-center text-white font-black">
                              {toPersianNumber(index + 1)}
                            </div>
                            <div>
                              <h3 className="font-black text-slate-800 dark:text-slate-100">
                                {section.title}
                              </h3>
                              <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1">
                                <span>
                                  📚 {toPersianNumber(section.sessions)} جلسه
                                </span>
                                <span>
                                  ⏱️ {toPersianNumber(section.duration)} ساعت
                                </span>
                              </div>
                            </div>
                          </div>
                          <ChevronDown className="w-5 h-5 text-slate-400" />
                        </div>
                        <div className="px-5 pb-5">
                          <div className="grid sm:grid-cols-3 gap-2">
                            {section.topics.map((topic, i) => (
                              <div
                                key={i}
                                className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 rounded-lg p-2.5"
                              >
                                <Video className="w-3.5 h-3.5 text-brand-700 dark:text-brand-300 flex-shrink-0" />
                                {topic}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* پیش‌نیازها */}
              <FadeIn delay={0.2}>
                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-8">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-950/50 flex items-center justify-center">
                      <AlertCircle className="w-6 h-6 text-orange-600 dark:text-orange-300" />
                    </div>
                    <h2 className="text-xl font-black text-slate-800 dark:text-slate-100">
                      پیش‌نیازهای دوره
                    </h2>
                  </div>

                  {course.prerequisites.length > 0 ? (
                    <ul className="space-y-3">
                      {course.prerequisites.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 text-slate-600 dark:text-slate-400"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0 mt-2" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-slate-500 dark:text-slate-400">
                      این دوره پیش‌نیاز خاصی ندارد و برای همه قابل شرکت است.
                    </p>
                  )}
                </div>
              </FadeIn>

              {/* برچسب‌ها */}
              <FadeIn delay={0.25}>
                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-8">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-brand-100 dark:bg-brand-950/50 flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-brand-800 dark:text-brand-300" />
                    </div>
                    <h2 className="text-xl font-black text-slate-800 dark:text-slate-100">
                      برچسب‌های دوره
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {course.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-brand-50 dark:bg-brand-950/30 text-brand-800 dark:text-brand-300 rounded-full text-sm font-bold hover:bg-brand-100 dark:hover:bg-brand-950/50 transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* ستون راست */}
            <div className="space-y-6">
              {/* استاد */}
              <FadeIn direction="left" delay={0.1}>
                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-6">
                  <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 mb-5">
                    استاد دوره
                  </h3>
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-brand-700 to-teal-500 flex items-center justify-center text-white text-4xl font-black mb-4 shadow-lg">
                      {course.instructor.name.charAt(0)}
                    </div>
                    <h4 className="font-black text-slate-800 dark:text-slate-100 mb-1">
                      {course.instructor.name}
                    </h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                      {course.instructor.title}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                      {course.instructor.bio}
                    </p>

                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                      <div className="text-center">
                        <div className="text-xl font-black text-brand-800 dark:text-brand-300">
                          {toPersianNumber(course.instructor.coursesCount)}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          دوره
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-black text-brand-800 dark:text-brand-300">
                          {toPersianNumber(course.instructor.studentsCount)}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          دانشجو
                        </div>
                      </div>
                    </div>

                    <Link
                      href={`/instructors/${course.instructor.id}`}
                      className="mt-5 inline-flex items-center justify-center gap-2 w-full py-2.5 border-2 border-brand-800 dark:border-brand-300 text-brand-800 dark:text-brand-300 rounded-xl font-bold text-sm hover:bg-brand-800 dark:hover:bg-brand-300 hover:text-white dark:hover:text-brand-800 transition-all hover:gap-3 group"
                    >
                      مشاهده پروفایل
                      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </FadeIn>

              {/* اطلاعات تکمیلی */}
              <FadeIn direction="left" delay={0.15}>
                <div className="bg-gradient-to-br from-[#1e3a8a] to-[#0d9488] rounded-3xl shadow-lg p-6 text-white relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-400/20 rounded-full blur-3xl" />

                  <div className="relative">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-orange-300" />
                      </div>
                      <h3 className="text-lg font-black">اطلاعات دوره</h3>
                    </div>

                    <div className="space-y-4 text-sm">
                      <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <span className="text-blue-200">نوع برگزاری</span>
                        <span className="font-bold">
                          {getModeIcon(course.mode)} {getModeLabel(course.mode)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <span className="text-blue-200">سطح</span>
                        <span className="font-bold">
                          {getLevelLabel(course.level)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <span className="text-blue-200">مدت</span>
                        <span className="font-bold">
                          {toPersianNumber(course.duration)} ساعت
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-blue-200">مدرک</span>
                        <span className="font-bold">
                          {course.certificate ? '✓ دارد' : '✗ ندارد'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* CTA */}
              <FadeIn direction="left" delay={0.2}>
                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 text-center">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-orange-100 dark:bg-orange-950/50 flex items-center justify-center mb-4">
                    <Trophy className="w-7 h-7 text-orange-600 dark:text-orange-300" />
                  </div>
                  <h4 className="font-black text-slate-800 dark:text-slate-100 mb-2">
                    آماده شروع هستی؟
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                    همین حالا ثبت‌نام کن و به جمع دانشجویان موفق سرآمد بپیوند
                  </p>
                  <Link
                    href={`/checkout?course=${course.slug}`}
                    className={cn(
                      'inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl font-black text-white bg-gradient-to-l',
                      courseColor.gradient,
                      'hover:shadow-lg transition-all hover:gap-3'
                    )}
                  >
                    <Zap className="w-4 h-4" />
                    ثبت‌نام سریع
                  </Link>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ===== دوره‌های مشابه ===== */}
      {relatedCourses.length > 0 && (
        <section className="py-12 lg:py-16 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
                <div>
                  <div className="inline-block px-4 py-1.5 bg-brand-100 dark:bg-brand-950/50 text-brand-800 dark:text-brand-300 rounded-full text-sm font-bold mb-3">
                    🔗 دوره‌های مشابه
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-black text-slate-800 dark:text-slate-100 mb-2">
                    دوره‌های مشابه
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400">
                    دوره‌های مشابه که ممکن است به آن‌ها علاقه‌مند باشید
                  </p>
                </div>
                <Link
                  href="/courses"
                  className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 border-2 border-brand-800 dark:border-brand-300 text-brand-800 dark:text-brand-300 rounded-xl font-bold hover:bg-brand-800 dark:hover:bg-brand-300 hover:text-white dark:hover:text-brand-800 transition-all hover:gap-3 group"
                >
                  مشاهده همه
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                </Link>
              </div>
            </FadeIn>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedCourses.map((c, index) => (
                <FadeIn
                  key={c.id}
                  delay={index * 0.1}
                  direction="up"
                  className="h-full"
                >
                  <CourseCard course={c} />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}