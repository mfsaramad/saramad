'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Loader2, Plus, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCourses = async () => {
    const { data } = await supabase.from('courses').select('*').order('created_at', { ascending: false });
    setCourses(data || []);
    setIsLoading(false);
  };

  useEffect(() => { fetchCourses(); }, []);

  const handleDelete = async (id: string) => {
    if (confirm('آیا از حذف این دوره مطمئن هستید؟')) {
      await supabase.from('courses').delete().eq('id', id);
      fetchCourses();
    }
  };

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 text-blue-600 animate-spin" /></div>;

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-slate-200">
        <h1 className="text-2xl font-black text-slate-800">مدیریت دوره‌ها</h1>
        <Link href="/admin/courses/new" className="bg-blue-700 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-800">
          <Plus className="w-5 h-5" /> دوره جدید
        </Link>
      </div>

      <div className="bg-white rounded-3xl overflow-hidden border border-slate-200">
        <table className="w-full text-right">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-sm font-bold text-slate-600">عنوان</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-600">قیمت</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-600">عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {courses.map(course => (
              <tr key={course.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-bold text-slate-800">{course.title}</td>
                <td className="px-6 py-4 text-slate-600">{course.price?.toLocaleString()} تومان</td>
                <td className="px-6 py-4 flex gap-2">
                  {/* لینک ویرایش با استفاده از Query Param */}
                  <Link href={`/admin/courses/edit?id=${course.id}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                    <Edit className="w-5 h-5" />
                  </Link>
                  <button onClick={() => handleDelete(course.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
            {courses.length === 0 && (
              <tr><td colSpan={3} className="text-center py-10 text-slate-500">دوره‌ای یافت نشد.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}