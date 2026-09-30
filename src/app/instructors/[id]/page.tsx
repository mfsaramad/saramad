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
  Briefcase,
  GraduationCap,
} from 'lucide-react';
import { instructors, courses } from '@/lib/data';
import { toPersianNumber } from '@/lib/format';
import CourseCard from '@/components/shared/CourseCard';

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

  // دوره‌های این استاد
  const instructorCourses = courses.filter(
    (c) => c.instructor.id === instructor.id
  );

  return (
    <div className="bg-slate-50 min-h-screen">
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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
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

          <div className="grid lg:grid-cols-3 gap-8 items-center">
            {/* آواتار */}
            <div className="lg:col-span-1 flex justify-center lg:justify-start">
              <div className="relative">
                <div className="w-40 h-40 lg:w-52 lg:h-52 rounded-full bg-gradient-to-br from-teal-400 via-brand-500 to-orange-500 p-1.5 shadow-2xl">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    <span className="text-7xl lg:text-8xl font-black text-brand-800">
                      {instructor.name.charAt(0)}
                    </span>
                  </div>
                </div>
                <div className="absolute -bottom-2 -left-2 px-4 py-2 bg-orange-500 rounded-full text-white text-xs font-black shadow-lg">
                  ⭐ {instructor.rating.toLocaleString('fa-IR')}
                </div>
              </div>
            </div>

            {/* اطلاعات */}
            <div className="lg:col-span-2 text-white text-center lg:text-right">
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
                <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-4">
                  <div className="flex items-center justify-center gap-1.5 text-2xl font-black text-white mb-1">
                    <BookOpen className="w-5 h-5 text-teal-400" />
                    {toPersianNumber(instructor.coursesCount)}
                  </div>
                  <div className="text-xs text-blue-200">دوره</div>
                </div>
                <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-4">
                  <div className="flex items-center justify-center gap-1.5 text-2xl font-black text-white mb-1">
                    <Users className="w-5 h-5 text-teal-400" />
                    {toPersianNumber(instructor.studentsCount)}
                  </div>
                  <div className="text-xs text-blue-200">دانشجو</div>
                </div>
                <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-4">
                  <div className="flex items-center justify-center gap-1.5 text-2xl font-black text-white mb-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    {instructor.rating.toLocaleString('fa-IR')}
                  </div>
                  <div className="text-xs text-blue-200">امتیاز</div>
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
            {/* ستون چپ - محتوای اصلی */}
            <div className="lg:col-span-2 space-y-6">
              {/* درباره استاد */}
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl bg-brand-100 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-brand-800" />
                  </div>
                  <h2 className="text-xl font-black text-slate-800">
                    درباره استاد
                  </h2>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {instructor.bio}
                </p>
              </div>

              {/* تخصص‌ها */}
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl bg-teal-100 flex items-center justify-center">
                    <Award className="w-5 h-5 text-teal-600" />
                  </div>
                  <h2 className="text-xl font-black text-slate-800">
                    تخصص‌ها و مهارت‌ها
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {instructor.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gradient-to-l from-brand-50 to-teal-50 text-brand-800 rounded-full text-sm font-bold border border-brand-100"
                    >
                      ✓ {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* دوره‌های استاد */}
              {instructorCourses.length > 0 && (
                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <h2 className="text-xl font-black text-slate-800">
                          دوره‌های این استاد
                        </h2>
                        <p className="text-xs text-slate-500">
                          {toPersianNumber(instructorCourses.length)} دوره
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    {instructorCourses.map((course) => (
                      <CourseCard key={course.id} course={course} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ستون راست - اطلاعات جانبی */}
            <div className="space-y-6">
              {/* کارت اطلاعات */}
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 sticky top-24">
                <h3 className="text-lg font-black text-slate-800 mb-5 pb-4 border-b border-slate-100">
                  اطلاعات تماس
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-brand-800" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">
                        ایمیل
                      </div>
                      <div className="text-sm font-bold text-slate-800">
                        info@saramad.ir
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">
                        تلفن
                      </div>
                      <div className="text-sm font-bold text-slate-800">
                        ۰۲۱-۱۲۳۴۵۶۷۸
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <Send className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">
                        تلگرام
                      </div>
                      <div className="text-sm font-bold text-slate-800">
                        @saramad
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-100">
                  <button className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white rounded-xl font-bold hover:shadow-xl transition-all">
                    <Mail className="w-4 h-4" />
                    ارسال پیام
                  </button>
                </div>
              </div>

              {/* افتخارات */}
              <div className="bg-gradient-to-br from-brand-800 to-brand-900 rounded-3xl shadow-lg p-6 text-white">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center">
                    <Award className="w-5 h-5 text-orange-300" />
                  </div>
                  <h3 className="text-lg font-black">افتخارات</h3>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                    <span className="text-blue-100">
                      مدرس برتر سال ۱۴۰۳
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                    <span className="text-blue-100">
                      بیش از {toPersianNumber(instructor.studentsCount)} دانشجوی موفق
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                    <span className="text-blue-100">
                      همکاری با شرکت‌های بزرگ
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                    <span className="text-blue-100">
                      گواهی‌نامه‌های بین‌المللی
                    </span>
                  </div>
                </div>
              </div>

              {/* بازگشت */}
              <Link
                href="/instructors"
                className="flex items-center justify-center gap-2 w-full py-3.5 border-2 border-brand-800 text-brand-800 rounded-xl font-bold hover:bg-brand-800 hover:text-white transition"
              >
                <ArrowLeft className="w-4 h-4" />
                بازگشت به لیست اساتید
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}