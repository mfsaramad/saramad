import Link from 'next/link';
import { ArrowLeft, Building2 } from 'lucide-react';
import { getCoursesByMode } from '@/lib/data';
import { toPersianNumber } from '@/lib/format';
import CourseCard from '@/components/shared/CourseCard';

export default function InPersonCoursesPage() {
  const courses = getCoursesByMode('in-person');

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* ===== هدر صفحه ===== */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] overflow-hidden">
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
            <Link href="/courses" className="hover:text-white transition">
              دوره‌ها
            </Link>
            <span>/</span>
            <span className="text-white font-bold">حضوری</span>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center mb-6">
              <Building2 className="w-10 h-10 text-white" />
            </div>

            <h1 className="text-4xl lg:text-5xl font-black text-white mb-4">
              🏢 دوره‌های حضوری
            </h1>

            <p className="text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed mb-6">
              تجربه واقعی کلاس، تعامل چهره‌به‌چهره با استاد و هم‌کلاسی‌ها در
              محیط آموزشی مجهز
            </p>

            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur border border-white/20 rounded-full text-white font-bold">
              📚 {toPersianNumber(courses.length)} دوره حضوری
            </div>
          </div>
        </div>
      </section>

      {/* ===== شبکه دوره‌ها ===== */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {courses.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-100">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-black text-slate-800 mb-2">
                دوره حضوری یافت نشد
              </h3>
            </div>
          )}

          {/* دکمه بازگشت */}
          <div className="text-center mt-12">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-brand-800 text-brand-800 rounded-xl font-bold hover:bg-brand-800 hover:text-white transition"
            >
              <ArrowLeft className="w-4 h-4" />
              مشاهده همه دوره‌ها
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}