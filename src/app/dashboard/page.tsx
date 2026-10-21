'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  ClipboardList, 
  Award, 
  TrendingUp, 
  Clock, 
  Zap,
  Loader2,
  ArrowLeft
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { toPersianNumber } from '@/lib/format';
import StatsCard from '@/components/dashboard/StatsCard';
import MyCourseCard from '@/components/dashboard/MyCourseCard';

export default function DashboardPage() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  
  const [myCourses, setMyCourses] = useState<any[]>([]);
  const [recentExams, setRecentExams] = useState<any[]>([]);
  const [stats, setStats] = useState({
    activeCourses: 0,
    completedExams: 0,
    certificates: 0,
    avgScore: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        // ۱. دریافت سفارشات کاربر (برای دوره‌ها)
        const { data: ordersData } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id)
          .in('status', ['paid', 'completed']);

        // ۲. دریافت نتایج آزمون‌های کاربر
        const { data: resultsData } = await supabase
          .from('exam_results')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        // ۳. دریافت تمام دوره‌ها (برای مپ کردن اطلاعات)
        const { data: allCourses } = await supabase.from('courses').select('*');

        // --- پردازش دوره‌های من ---
        const courseItems: any[] = [];
        (ordersData || []).forEach((order) => {
          const items = order.items || [];
          items.forEach((item: any) => {
            if (item.type === 'course') {
              // پیدا کردن دوره در دیتابیس
              const found = (allCourses || []).find(
                (c: any) => c.slug === item.id || c.id === item.id || c.title === item.title
              );
              if (found && !courseItems.some((c) => c.course.id === found.id)) {
                courseItems.push({
                  course: {
                    ...found,
                    studentsCount: found.students_count || 0,
                    shortDescription: found.short_description || '',
                    instructor: { name: found.instructor_name || 'استاد' }, // اگر جدول اساتید جدا است، اینجا تغییر دهید
                  },
                  progress: 0,
                  status: order.status === 'completed' ? 'completed' : 'active',
                });
              }
            }
          });
        });

        // فقط ۳ دوره آخر را نمایش بده
        setMyCourses(courseItems.slice(0, 3));

        // --- پردازش آزمون‌های اخیر ---
        const formattedExams = (resultsData || []).slice(0, 3).map((res) => ({
          title: res.exam_title,
          score: res.score,
          date: new Date(res.created_at).toLocaleDateString('fa-IR'),
          passed: res.status === 'passed',
        }));
        setRecentExams(formattedExams);

        // --- محاسبه آمار ---
        const passedCount = (resultsData || []).filter(r => r.status === 'passed').length;
        const totalScore = (resultsData || []).reduce((sum, r) => sum + (r.score || 0), 0);
        const avg = resultsData && resultsData.length > 0 ? Math.round(totalScore / resultsData.length) : 0;

        setStats({
          activeCourses: courseItems.filter(c => c.status === 'active').length,
          completedExams: resultsData?.length || 0,
          certificates: passedCount, // فعلاً هر آزمون قبول‌شده = گواهی‌نامه
          avgScore: avg,
        });

      } catch (error) {
        console.error('خطا در دریافت اطلاعات داشبورد:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-brand-800 dark:text-brand-400 animate-spin mb-4" />
        <p className="text-slate-500 dark:text-slate-400 font-bold">در حال دریافت اطلاعات...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#0d9488] rounded-3xl p-6 lg:p-8 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
        <div className="relative">
          <h1 className="text-2xl lg:text-3xl font-black mb-2">
            سلام {user?.name?.split(' ')[0] || 'خوش آمدی'}! 👋
          </h1>
          <p className="text-blue-100 text-sm lg:text-base">
            به پنل کاربری سرآمد خوش آمدی. اینجا می‌تونی دوره‌ها، آزمون‌ها و مدارکت
            رو مدیریت کنی.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          icon={BookOpen}
          label="دوره‌های فعال"
          value={toPersianNumber(stats.activeCourses)}
          color="brand"
        />
        <StatsCard
          icon={ClipboardList}
          label="آزمون‌های انجام‌شده"
          value={toPersianNumber(stats.completedExams)}
          color="teal"
        />
        <StatsCard
          icon={Award}
          label="مدارک کسب‌شده"
          value={toPersianNumber(stats.certificates)}
          color="accent"
        />
        <StatsCard
          icon={TrendingUp}
          label="میانگین امتیاز"
          value={stats.completedExams > 0 ? `${toPersianNumber(stats.avgScore)}٪` : '—'}
          color="purple"
        />
      </div>

      {/* My Courses */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 lg:p-8 border border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-brand-100 dark:bg-brand-950/50 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-brand-800 dark:text-brand-300" />
            </div>
            <div>
              <h2 className="text-lg lg:text-xl font-black text-slate-800 dark:text-slate-100">
                دوره‌های من
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {toPersianNumber(myCourses.length)} دوره اخیر
              </p>
            </div>
          </div>
          {myCourses.length > 0 && (
            <Link href="/dashboard/courses" className="text-sm font-bold text-brand-800 dark:text-brand-300 hover:underline flex items-center gap-1">
              مشاهده همه <ArrowLeft className="w-4 h-4" />
            </Link>
          )}
        </div>

        {myCourses.length > 0 ? (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {myCourses.map((item) => (
              <MyCourseCard
                key={item.course.id}
                course={item.course}
                progress={item.progress}
                status={item.status}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
            <div className="text-4xl mb-3">📚</div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">هنوز دوره‌ای نخریده‌اید</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">برای شروع یادگیری، از صفحه دوره‌ها یک دوره انتخاب کنید.</p>
            <Link href="/courses" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white rounded-xl font-bold hover:shadow-lg transition text-sm">
              مشاهده دوره‌ها
            </Link>
          </div>
        )}
      </div>

      {/* Recent Exams */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 lg:p-8 border border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-teal-100 dark:bg-teal-950/50 flex items-center justify-center">
              <ClipboardList className="w-5 h-5 text-teal-600 dark:text-teal-300" />
            </div>
            <div>
              <h2 className="text-lg lg:text-xl font-black text-slate-800 dark:text-slate-100">
                آخرین آزمون‌های من
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {toPersianNumber(recentExams.length)} آزمون اخیر
              </p>
            </div>
          </div>
          {recentExams.length > 0 && (
            <Link href="/dashboard/exams" className="text-sm font-bold text-teal-600 dark:text-teal-300 hover:underline flex items-center gap-1">
              مشاهده همه <ArrowLeft className="w-4 h-4" />
            </Link>
          )}
        </div>

        {recentExams.length > 0 ? (
          <div className="space-y-3">
            {recentExams.map((exam, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${
                    exam.passed
                      ? 'bg-teal-100 dark:bg-teal-950/50'
                      : 'bg-red-100 dark:bg-red-950/50'
                  }`}
                >
                  {exam.passed ? '✅' : '❌'}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm text-slate-800 dark:text-slate-100 line-clamp-1 mb-1">
                    {exam.title}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {exam.date}
                    </div>
                    <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                    <div className="flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      امتیاز: {toPersianNumber(exam.score)}
                    </div>
                  </div>
                </div>

                <div
                  className={`px-3 py-1 rounded-full text-xs font-black flex-shrink-0 ${
                    exam.passed
                      ? 'bg-teal-100 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300'
                      : 'bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-300'
                  }`}
                >
                  {exam.passed ? 'قبول' : 'مردود'}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
            <div className="text-4xl mb-3">📋</div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">هنوز آزمونی نداده‌اید</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">برای سنجش دانش خود، در یکی از آزمون‌های سرآمد شرکت کنید.</p>
            <Link href="/exams" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white rounded-xl font-bold hover:shadow-lg transition text-sm">
              مشاهده آزمون‌ها
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}