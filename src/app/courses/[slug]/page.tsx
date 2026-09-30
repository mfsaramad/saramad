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
} from 'lucide-react';
import { courses, getCourseBySlug } from '@/lib/data';
import {
  toPersianNumber,
  formatPrice,
  getModeLabel,
  getModeIcon,
  getLevelLabel,
} from '@/lib/format';
import CourseCard from '@/components/shared/CourseCard';

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

  const relatedCourses = courses
    .filter((c) => c.id !== course.id && c.mode === course.mode)
    .slice(0, 3);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* ===== Breadcrumb ===== */}
      <div className="pt-28 pb-4 bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#0d9488]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-blue-100">
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
        </div>
      </div>

      {/* ===== Hero دوره ===== */}
      <section className="relative pb-16 bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#0d9488] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* اطلاعات دوره */}
            <div className="lg:col-span-2 text-white">
              {/* برچسب‌ها */}
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
              </div>

              {/* عنوان */}
              <h1 className="text-3xl lg:text-5xl font-black leading-tight mb-6">
                {course.title}
              </h1>

              {/* توضیح */}
              <p className="text-lg text-blue-100 leading-relaxed mb-8 max-w-2xl">
                {course.description}
              </p>

              {/* اطلاعات سریع */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-teal-400" />
                  </div>
                  <div>
                    <div className="text-xs text-blue-200">مدت دوره</div>
                    <div className="font-black">
                      {toPersianNumber(course.duration)} ساعت
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-teal-400" />
                  </div>
                  <div>
                    <div className="text-xs text-blue-200">تعداد جلسات</div>
                    <div className="font-black">
                      {toPersianNumber(course.sessions)} جلسه
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center">
                    <Users className="w-5 h-5 text-teal-400" />
                  </div>
                  <div>
                    <div className="text-xs text-blue-200">دانشجویان</div>
                    <div className="font-black">
                      {toPersianNumber(course.studentsCount)}+
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center">
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
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-400 to-brand-500 flex items-center justify-center text-white text-xl font-black">
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

            {/* کارت خرید */}
            <div className="lg:sticky lg:top-24">
              <div className="bg-white rounded-3xl shadow-2xl p-6 lg:p-7">
                {/* قیمت */}
                <div className="mb-6 pb-6 border-b border-slate-100">
                  <div className="text-xs text-slate-500 mb-1">شروع از</div>
                  <div className="text-3xl font-black text-brand-800">
                    {formatPrice(lowestPrice)}
                  </div>
                </div>

                {/* اطلاعات سریع */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      شروع دوره
                    </span>
                    <span className="font-bold text-slate-800">
                      {course.startDate}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      زمان برگزاری
                    </span>
                    <span className="font-bold text-slate-800 text-xs">
                      {course.schedule}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      ظرفیت باقی‌مانده
                    </span>
                    <span
                      className={`font-bold ${
                        course.remainingCapacity <= 5
                          ? 'text-red-600'
                          : 'text-slate-800'
                      }`}
                    >
                      {toPersianNumber(course.remainingCapacity)} نفر
                      {course.remainingCapacity <= 5 && ' 🔥'}
                    </span>
                  </div>
                </div>

                {/* دکمه‌های اقدام */}
                <div className="space-y-3 mb-6">
                  <button className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white rounded-xl font-black hover:shadow-xl transition-all hover:scale-[1.02]">
                    <ShoppingCart className="w-5 h-5" />
                    ثبت‌نام در دوره
                  </button>

                  <button className="w-full flex items-center justify-center gap-2 py-3.5 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-all">
                    <PlayCircle className="w-5 h-5" />
                    مشاهده سرفصل‌ها
                  </button>
                </div>

                {/* مزایا */}
                <div className="pt-6 border-t border-slate-100 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-teal-500 flex-shrink-0" />
                    پشتیبانی آنلاین در طول دوره
                  </div>
                  {course.certificate && (
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="w-5 h-5 text-teal-500 flex-shrink-0" />
                      صدور مدرک معتبر پایان دوره
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-teal-500 flex-shrink-0" />
                    دسترسی به ویدیوهای ضبط‌شده
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-teal-500 flex-shrink-0" />
                    امکان پرداخت اقساطی
                  </div>
                </div>

                {/* دکمه‌های کمکی */}
                <div className="flex items-center gap-2 mt-6 pt-6 border-t border-slate-100">
                  <button className="flex-1 flex items-center justify-center gap-1 py-2.5 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition">
                    <Heart className="w-4 h-4" />
                    ذخیره
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1 py-2.5 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition">
                    <Share2 className="w-4 h-4" />
                    اشتراک
                  </button>
                </div>
              </div>
            </div>
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
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl bg-brand-100 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-brand-800" />
                  </div>
                  <h2 className="text-xl font-black text-slate-800">
                    درباره این دوره
                  </h2>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {course.description}
                </p>
              </div>

              {/* سرفصل‌ها */}
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl bg-teal-100 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-teal-600" />
                  </div>
                  <h2 className="text-xl font-black text-slate-800">
                    آنچه در این دوره یاد می‌گیرید
                  </h2>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    'مبانی و مفاهیم پایه',
                    'پروژه‌های عملی واقعی',
                    'کار با ابزارهای حرفه‌ای',
                    'آماده‌سازی برای بازار کار',
                    'رفع اشکال و پشتیبانی',
                    'مدرک معتبر پایان دوره',
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl"
                    >
                      <Check className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* پیش‌نیازها */}
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-orange-600" />
                  </div>
                  <h2 className="text-xl font-black text-slate-800">
                    پیش‌نیازهای دوره
                  </h2>
                </div>

                {course.prerequisites.length > 0 ? (
                  <ul className="space-y-3">
                    {course.prerequisites.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-slate-600"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0 mt-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-500">
                    این دوره پیش‌نیاز خاصی ندارد و برای همه قابل شرکت است.
                  </p>
                )}
              </div>

              {/* برچسب‌ها */}
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
                <h2 className="text-xl font-black text-slate-800 mb-5">
                  برچسب‌های دوره
                </h2>
                <div className="flex flex-wrap gap-2">
                  {course.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-brand-50 text-brand-800 rounded-full text-sm font-bold"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* ستون راست (محتوای اضافه) */}
            <div className="space-y-6">
              {/* اطلاعات استاد */}
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
                <h3 className="text-lg font-black text-slate-800 mb-5">
                  استاد دوره
                </h3>
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-brand-700 to-teal-500 flex items-center justify-center text-white text-4xl font-black mb-4">
                    {course.instructor.name.charAt(0)}
                  </div>
                  <h4 className="font-black text-slate-800 mb-1">
                    {course.instructor.name}
                  </h4>
                  <p className="text-sm text-slate-500 mb-4">
                    {course.instructor.title}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {course.instructor.bio}
                  </p>

                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
                    <div>
                      <div className="text-xl font-black text-brand-800">
                        {toPersianNumber(course.instructor.coursesCount)}
                      </div>
                      <div className="text-xs text-slate-500">دوره</div>
                    </div>
                    <div>
                      <div className="text-xl font-black text-brand-800">
                        {toPersianNumber(course.instructor.studentsCount)}
                      </div>
                      <div className="text-xs text-slate-500">دانشجو</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* اطلاعات تکمیلی */}
              <div className="bg-gradient-to-br from-brand-800 to-brand-900 rounded-3xl shadow-lg p-6 text-white">
                <h3 className="text-lg font-black mb-5">اطلاعات دوره</h3>
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
          </div>
        </div>
      </section>

      {/* ===== دوره‌های مشابه ===== */}
      {relatedCourses.length > 0 && (
        <section className="py-12 lg:py-16 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl lg:text-3xl font-black text-slate-800 mb-2">
                  دوره‌های مشابه
                </h2>
                <p className="text-slate-600">
                  دوره‌های مشابه که ممکن است به آن‌ها علاقه‌مند باشید
                </p>
              </div>
              <Link
                href="/courses"
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 border-2 border-brand-800 text-brand-800 rounded-xl font-bold hover:bg-brand-800 hover:text-white transition"
              >
                مشاهده همه
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedCourses.map((c) => (
                <CourseCard key={c.id} course={c} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}