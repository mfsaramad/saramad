'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, BookOpen, Users, Award, DollarSign, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function TeacherDashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ courses: 0, students: 0, exams: 0, revenue: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;
      try {
        // ۱. تعداد دوره‌ها
        const { count: coursesCount } = await supabase
          .from('courses')
          .select('*', { count: 'exact', head: true })
          .eq('instructor_id', user.id);

        // ۲. تعداد دانشجویان (کسانی که این دوره‌ها را خریداری کرده‌اند)
        const { data: myCourses } = await supabase
          .from('courses')
          .select('id')
          .eq('instructor_id', user.id);
        
        let studentsCount = 0;
        if (myCourses && myCourses.length > 0) {
          const courseIds = myCourses.map(c => c.id);
          const { data: orders } = await supabase
            .from('orders')
            .select('user_id')
            .in('course_id', courseIds)
            .eq('status', 'paid');
          
          studentsCount = new Set(orders?.map(o => o.user_id)).size;
        }

        // ۳. تعداد آزمون‌ها
        const { count: examsCount } = await supabase
          .from('exams')
          .select('*', { count: 'exact', head: true })
          .eq('instructor_id', user.id);

        setStats({
          courses: coursesCount || 0,
          students: studentsCount,
          exams: examsCount || 0,
          revenue: 0,
        });
      } catch (err) {
        console.error('خطا در دریافت آمار:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, [user]);

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-blue-600" /></div>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-800">پنل استاد</h1>
          <p className="text-slate-500 mt-1">خوش آمدید، {user?.name || 'استاد'}</p>
        </div>
        <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition">
          <ArrowLeft className="w-5 h-5" /> بازگشت به سایت
        </Link>
      </div>

      {/* آمار */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
            <BookOpen className="w-6 h-6" />
          </div>
          <p className="text-sm text-slate-500">دوره‌های من</p>
          <p className="text-3xl font-black text-slate-800">{stats.courses}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center mb-4">
            <Users className="w-6 h-6" />
          </div>
          <p className="text-sm text-slate-500">دانشجویان</p>
          <p className="text-3xl font-black text-slate-800">{stats.students}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-4">
            <Award className="w-6 h-6" />
          </div>
          <p className="text-sm text-slate-500">آزمون‌ها</p>
          <p className="text-3xl font-black text-slate-800">{stats.exams}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4">
            <DollarSign className="w-6 h-6" />
          </div>
          <p className="text-sm text-slate-500">درآمد (تومان)</p>
          <p className="text-3xl font-black text-slate-800">{stats.revenue.toLocaleString()}</p>
        </div>
      </div>

      {/* اقدامات سریع */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/admin/exams" className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col items-center text-center">
          <Award className="w-12 h-12 text-orange-500 mb-4" />
          <h2 className="text-xl font-black text-slate-800 mb-2">مدیریت آزمون‌ها</h2>
          <p className="text-slate-500 text-sm">ایجاد آزمون جدید و مدیریت سوالات</p>
        </Link>

        <Link href="/dashboard/courses" className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col items-center text-center">
          <BookOpen className="w-12 h-12 text-blue-500 mb-4" />
          <h2 className="text-xl font-black text-slate-800 mb-2">دوره‌های من</h2>
          <p className="text-slate-500 text-sm">مدیریت محتوای دوره‌ها و جلسات</p>
        </Link>
      </div>
    </div>
  );
}