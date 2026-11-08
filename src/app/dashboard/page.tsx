'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, BookOpen, PlayCircle, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function StudentDashboard() {
  const { user } = useAuth();
  const [myCourses, setMyCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!user) { setIsLoading(false); return; }
      try {
        // دریافت سفارشات
        const { data: orders, error: ordersError } = await supabase
          .from('orders')
          .select('course_id')
          .eq('user_id', user.id);

        if (ordersError) throw new Error("خطای سفارشات: " + ordersError.message);

        // دریافت دسترسی‌های مستقیم
        const { data: access, error: accessError } = await supabase
          .from('user_resource_access')
          .select('resource_id')
          .eq('user_id', user.id)
          .eq('resource_type', 'course');

        if (accessError) throw new Error("خطای دسترسی: " + accessError.message);

        const orderIds = orders?.map(o => o.course_id).filter(id => id != null) || [];
        const accessIds = access?.map(a => a.resource_id) || [];
        const allIds = [...new Set([...orderIds, ...accessIds])];

        if (allIds.length > 0) {
          const { data: courses, error: coursesError } = await supabase
            .from('courses')
            .select('*')
            .in('id', allIds);
          
          if (coursesError) throw new Error("خطای دوره‌ها: " + coursesError.message);
          setMyCourses(courses || []);
        }
      } catch (error: any) {
        setErrorMsg(error.message);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [user]);

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 text-blue-600 animate-spin" /></div>;

  if (errorMsg) {
    return (
      <div className="max-w-4xl mx-auto p-6" dir="rtl">
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl">
          <h3 className="font-bold mb-2">خطا در دریافت اطلاعات:</h3>
          <p>{errorMsg}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 py-8" dir="rtl">
      <div className="bg-gradient-to-l from-blue-900 to-teal-600 rounded-3xl p-8 text-white">
        <h1 className="text-2xl font-black mb-2">سلام {user?.name || 'دانشجو'} 👋</h1>
        <p className="text-blue-100 text-sm">به پنل کاربری خود خوش آمدید.</p>
      </div>
      
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
        <h2 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-700" /> دوره‌های من ({myCourses.length})
        </h2>
        
        {myCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myCourses.map((course) => (
              <div key={course.id} className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col">
                <div className="h-32 bg-slate-100 flex items-center justify-center">
                  <BookOpen className="w-10 h-10 text-slate-300" />
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-bold text-slate-800 mb-2 flex-1">{course.title}</h3>
                  
                  <Link 
                    href={`/dashboard/courses/${course.id}`} 
                    className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 font-bold text-sm rounded-xl hover:bg-blue-100 transition"
                  >
                    <PlayCircle className="w-4 h-4" /> ادامه یادگیری
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 mb-4">شما هنوز در هیچ دوره‌ای ثبت‌نام نکرده‌اید.</p>
            <Link href="/courses" className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold">مشاهده دوره‌ها</Link>
          </div>
        )}
      </div>
    </div>
  );
}

