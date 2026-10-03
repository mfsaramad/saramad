import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  Star,
  Users,
  BookOpen,
  Award,
  Mail,
  Phone,
  Send,
  CheckCircle2,
  GraduationCap,
  Sparkles,
  TrendingUp,
  Trophy,
  Target,
} from 'lucide-react';
import { instructors, courses } from '@/lib/data';
import { toPersianNumber } from '@/lib/format';
import CourseCard from '@/components/shared/CourseCard';
import FadeIn from '@/components/animations/FadeIn';
import { cn } from '@/lib/utils';

// ✅ برای Static Export
export function generateStaticParams() {
  return instructors.map((instructor) => ({
    id: instructor.id,
  }));
}

interface InstructorProfilePageProps {
  params: Promise<{ id: string }>;
}

export default async function InstructorProfilePage({
  params,
}: InstructorProfilePageProps) {
  const { id } = await params;
  const instructor = instructors.find((i) => i.id === id);

  if (!instructor) {
    notFound();
  }

  const instructorCourses = courses.filter(
    (c) => c.instructor.id === instructor.id
  );

  const achievements = [
    'مدرس برتر سال ۱۴۰۳',
    `بیش از ${toPersianNumber(instructor.studentsCount)} دانشجوی موفق`,
    'همکاری با شرکت‌های بزرگ',
    'گواهی‌نامه‌های بین‌المللی',
  ];

  const stats = [
    {
      icon: BookOpen,
      value: toPersianNumber(instructor.coursesCount),
      label: 'دوره',
      color: 'brand' as const,
    },
    {
      icon: Users,
      value: toPersianNumber(instructor.studentsCount),
      label: 'دانشجو',
      color: 'teal' as const,
    },
    {
      icon: Star,
      value: instructor.rating.toLocaleString('fa-IR'),
      label: 'امتیاز',
      color: 'accent' as const,
    },
  ];

  const statColorMap = {
    brand: {
      bg: 'bg-blue-100 dark:bg-blue-950/50',
      icon: 'text-blue-800 dark:text-blue-300',
    },
    teal: {
      bg: 'bg-teal-100 dark:bg-teal-950/50',
      icon: 'text-teal-600 dark:text-teal-300',
    },
    accent: {
      bg: 'bg-orange-100 dark:bg-orange-950/50',
      icon: 'text-orange-600 dark:text-orange-300',
    },
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
      {/* ===== Hero استاد ===== */}
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
            <div className="flex items-center gap-2 text-sm text-blue-100 mb-8">
              <Link href="/" className="hover:text-white transition">
                خانه
              </Link>
              <span>/</span>
              <Link
                href="/instructors"
                className="hover:text-white transition"
              >
                اساتید
              </Link>
              <span>/</span>
              <span className="text-white font-bold">{instructor.name}</span>
            </div>
          </FadeIn>

          <div className="grid lg:grid-cols-3 gap-8 items-center">
            {/* آواتار */}
            <FadeIn className="lg:col-span-1 flex justify-center lg:justify-start">
              <div className="relative group">
                <div className="w-40 h-40 lg:w-56 lg:h-56 rounded-full bg-gradient-to-br from-teal-400 via-brand-500 to-orange-500 p-1.5 shadow-2xl group-hover:scale-105 transition-transform duration-500">
                  <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center">
                    <span className="text-7xl lg:text-9xl font-black text-brand-800 dark:text-brand-300">
                      {instructor.name.charAt(0)}
                    </span>
                  </div>
                </div>

                {/* امتیاز */}
                <div className="absolute -bottom-2 -left-2 px-4 py-2 bg-orange-500 rounded-full text-white text-xs font-black shadow-lg flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 fill-yellow-300 text-yellow-300" />
                  {instructor.rating.toLocaleString('fa-IR')}
                </div>

                {/* نقطه آنلاین */}
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-green-500 border-4 border-white dark:border-slate-900 animate-pulse" />
              </div>
            </FadeIn>

            {/* اطلاعات */}
            <FadeIn delay={0.15} className="lg:col-span-2 text-white text-center lg:text-right">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur border border-white/20 rounded-full text-xs font-bold mb-3">
                <Sparkles className="w-3.5 h-3.5 text-orange-300" />
                <span>استاد برتر سرآمد</span>
              </div>

              <h1 className="text-3xl lg:text-5xl font-black mb-3">
                {instructor.name}
              </h1>

              <p className="text-lg lg:text-xl text-teal-300 font-bold mb-6">
                {instructor.title}
              </p>

              <p className="text-blue-100 leading-relaxed mb-8 max-w-2xl lg:mx-0 mx-auto">
                {instructor.bio}
              </p>

              {/* آمار */}
              <div className="grid grid-cols-3 gap-4 max-w-lg lg:mx-0 mx-auto">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  const colors = statColorMap[stat.color];

                  return (
                    <div
                      key={index}
                      className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-4 hover:bg-white/15 hover:-translate-y-1 transition-all duration-300 group"
                    >
                      <div className="flex items-center justify-center gap-1.5 text-2xl font-black text-white mb-1">
                        <Icon className="w-5 h-5 text-teal-400 group-hover:scale-110 transition-transform" />
                        {stat.value}
                      </div>
                      <div className="text-xs text-blue-200">{stat.label}</div>
                    </div>
                  );
                })}
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
              {/* درباره استاد */}
              <FadeIn>
                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-8">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-brand-100 dark:bg-brand-950/50 flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-brand-800 dark:text-brand-300" />
                    </div>
                    <h2 className="text-xl font-black text-slate-800 dark:text-slate-100">
                      درباره استاد
                    </h2>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {instructor.bio}
                  </p>
                </div>
              </FadeIn>

              {/* تخصص‌ها */}
              <FadeIn delay={0.1}>
                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-8">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-teal-100 dark:bg-teal-950/50 flex items-center justify-center">
                      <Award className="w-6 h-6 text-teal-600 dark:text-teal-300" />
                    </div>
                    <h2 className="text-xl font-black text-slate-800 dark:text-slate-100">
                      تخصص‌ها و مهارت‌ها
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {instructor.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gradient-to-l from-brand-50 to-teal-50 dark:from-brand-950/30 dark:to-teal-950/30 text-brand-800 dark:text-brand-300 rounded-full text-sm font-bold border border-brand-100 dark:border-brand-900/50 hover:scale-105 transition-transform cursor-pointer"
                      >
                        ✓ {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* دوره‌های استاد */}
              {instructorCourses.length > 0 && (
                <FadeIn delay={0.15}>
                  <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-950/50 flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-orange-600 dark:text-orange-300" />
                        </div>
                        <div>
                          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100">
                            دوره‌های این استاد
                          </h2>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {toPersianNumber(instructorCourses.length)} دوره
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      {instructorCourses.map((course, index) => (
                        <FadeIn
                          key={course.id}
                          delay={index * 0.1}
                          direction="up"
                          className="h-full"
                        >
                          <CourseCard course={course} />
                        </FadeIn>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              )}
            </div>

            {/* ستون راست */}
            <div className="space-y-6">
              {/* اطلاعات تماس */}
              <FadeIn direction="left" delay={0.1}>
                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 lg:sticky lg:top-24">
                  <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 mb-5 pb-4 border-b border-slate-100 dark:border-slate-800">
                    اطلاعات تماس
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3 group">
                      <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-950/50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Mail className="w-5 h-5 text-brand-800 dark:text-brand-300" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                          ایمیل
                        </div>
                        <div className="text-sm font-bold text-slate-800 dark:text-slate-100">
                          info@saramad.ir
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 group">
                      <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950/50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Phone className="w-5 h-5 text-teal-600 dark:text-teal-300" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                          تلفن
                        </div>
                        <div className="text-sm font-bold text-slate-800 dark:text-slate-100">
                          ۰۹۳۶۲۸۴۷۹۲۲
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 group">
                      <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Send className="w-5 h-5 text-orange-600 dark:text-orange-300" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                          تلگرام
                        </div>
                        <div className="text-sm font-bold text-slate-800 dark:text-slate-100">
                          @saramad
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                    <button className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white rounded-xl font-bold hover:shadow-xl transition-all hover:gap-3">
                      <Mail className="w-4 h-4" />
                      ارسال پیام
                    </button>
                  </div>
                </div>
              </FadeIn>

              {/* افتخارات */}
              <FadeIn direction="left" delay={0.2}>
                <div className="bg-gradient-to-br from-[#1e3a8a] to-[#0d9488] rounded-3xl shadow-lg p-6 text-white relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-400/20 rounded-full blur-3xl" />

                  <div className="relative">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center">
                        <Trophy className="w-5 h-5 text-orange-300" />
                      </div>
                      <h3 className="text-lg font-black">افتخارات</h3>
                    </div>

                    <div className="space-y-3 text-sm">
                      {achievements.map((achievement, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                          <span className="text-blue-100">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* بازگشت */}
              <FadeIn direction="left" delay={0.25}>
                <Link
                  href="/instructors"
                  className="flex items-center justify-center gap-2 w-full py-3.5 border-2 border-brand-800 dark:border-brand-300 text-brand-800 dark:text-brand-300 rounded-xl font-bold hover:bg-brand-800 dark:hover:bg-brand-300 hover:text-white dark:hover:text-brand-800 transition-all hover:gap-3 group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  بازگشت به لیست اساتید
                </Link>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}