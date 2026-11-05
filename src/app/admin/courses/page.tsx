'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Loader2, BookOpen, Plus, X, Edit, Trash2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [instructors, setInstructors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '', short_description: '', instructor_id: '', price_online: '', price_in_person: '', mode: 'online', level: 'beginner', tags: ''
  });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const { data: coursesData } = await supabase.from('courses').select(`*, users:instructor_id(name)`).order('created_at', { ascending: false });
      setCourses(coursesData || []);
      const { data: allUsers } = await supabase.from('admin_users_view').select('*');
      setInstructors(allUsers?.filter((u: any) => u.role_name === 'instructor' || u.role_title === 'استاد') || []);
    } catch (error) { console.error(error); } finally { setIsLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const generateSlug = (text: string) => {
    const map: { [key: string]: string } = { 'آ': 'a', 'ا': 'a', 'ب': 'b', 'پ': 'p', 'ت': 't', 'ث': 's', 'ج': 'j', 'چ': 'ch', 'ح': 'h', 'خ': 'kh', 'د': 'd', 'ذ': 'z', 'ر': 'r', 'ز': 'z', 'ژ': 'zh', 'س': 's', 'ش': 'sh', 'ص': 's', 'ض': 'z', 'ط': 't', 'ظ': 'z', 'ع': 'a', 'غ': 'gh', 'ف': 'f', 'ق': 'gh', 'ک': 'k', 'گ': 'g', 'ل': 'l', 'م': 'm', 'ن': 'n', 'و': 'v', 'ه': 'h', 'ی': 'y', ' ': '-', '_': '-' };
    return text.trim().toLowerCase().split('').map(char => map[char] || char).join('') + '-' + Math.floor(Math.random() * 10000);
  };

  const handleOpenEdit = (course: any) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      short_description: course.short_description || '',
      instructor_id: course.instructor_id || '',
      price_online: course.price?.online || '',
      price_in_person: course.price?.['in-person'] || '',
      mode: course.mode || 'online',
      level: course.level || 'beginner',
      tags: course.tags?.join(', ') || ''
    });
    setIsModalOpen(true);
  };

  const handleOpenCreate = () => {
    setEditingCourse(null);
    setFormData({ title: '', short_description: '', instructor_id: '', price_online: '', price_in_person: '', mode: 'online', level: 'beginner', tags: '' });
    setIsModalOpen(true);
  };

  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(t => t !== '');
      const priceObj: any = {};
      if (formData.price_online) priceObj.online = Number(formData.price_online);
      if (formData.price_in_person) priceObj['in-person'] = Number(formData.price_in_person);

      const courseData = {
        title: formData.title,
        short_description: formData.short_description,
        description: formData.short_description,
        instructor_id: formData.instructor_id || null,
        price: Object.keys(priceObj).length > 0 ? priceObj : { online: 0 },
        mode: formData.mode,
        level: formData.level,
        tags: tagsArray,
      };

      if (editingCourse) {
        const { error } = await supabase.from('courses').update(courseData).eq('id', editingCourse.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('courses').insert({ ...courseData, slug: generateSlug(formData.title), is_active: true });
        if (error) throw error;
      }
      
      setIsModalOpen(false); 
      fetchData();
    } catch (error: any) { 
      alert('خطا در ذخیره دوره: ' + error.message); 
    } finally { setIsSubmitting(false); }
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (!confirm('آیا از حذف این دوره مطمئن هستید؟')) return;
    try {
      const { error } = await supabase.from('courses').delete().eq('id', courseId);
      if (error) throw error;
      setCourses(courses.filter(c => c.id !== courseId));
    } catch (error: any) { alert('خطا در حذف: ' + error.message); }
  };

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 text-blue-600 animate-spin" /></div>;

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="p-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition"><ArrowRight className="w-5 h-5 text-slate-700" /></Link>
          <h1 className="text-xl font-black text-slate-800 flex items-center gap-2"><BookOpen className="w-6 h-6 text-blue-700" /> مدیریت دوره‌ها</h1>
        </div>
        <button onClick={handleOpenCreate} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl flex items-center gap-2 transition">
          <Plus className="w-4 h-4" /> دوره جدید
        </button>
      </div>

      <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm">
        <table className="w-full text-right">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-sm font-bold text-slate-600">عنوان دوره</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-600">نوع دوره</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-600">سطح</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-600">استاد</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-600">عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {courses.map((course) => (
              <tr key={course.id} className="hover:bg-slate-50 transition">
                <td className="px-6 py-4 font-bold text-slate-800">{course.title}</td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                    {course.mode === 'online' ? 'آنلاین' : course.mode === 'in-person' ? 'حضوری' : 'ترکیبی'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  <span className="bg-teal-50 text-teal-700 px-2 py-1 rounded text-xs">
                    {course.level === 'beginner' ? 'مقدماتی' : course.level === 'intermediate' ? 'متوسط' : 'پیشرفته'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">{course.users?.name || 'نامشخص'}</td>
                <td className="px-6 py-4 flex items-center gap-2">
                  <Link href={`/admin/courses/${course.id}`} className="px-3 py-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition flex items-center gap-1">
                    <BookOpen className="w-3 h-3"/> محتوا
                  </Link>
                  <button onClick={() => handleOpenEdit(course)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => handleDeleteCourse(course.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-5 border-b bg-slate-50">
              <h3 className="font-black text-slate-800">{editingCourse ? 'ویرایش دوره' : 'افزودن دوره جدید'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveCourse} className="p-5 overflow-y-auto space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2"><label className="block text-sm font-bold mb-1">عنوان دوره *</label><input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 rounded-xl border outline-none" /></div>
                <div className="col-span-2"><label className="block text-sm font-bold mb-1">توضیحات کوتاه</label><textarea value={formData.short_description} onChange={e => setFormData({...formData, short_description: e.target.value})} className="w-full px-4 py-2 rounded-xl border outline-none h-20 resize-none"></textarea></div>
                <div><label className="block text-sm font-bold mb-1">نوع دوره</label><select value={formData.mode} onChange={e => setFormData({...formData, mode: e.target.value})} className="w-full px-4 py-2 rounded-xl border outline-none"><option value="online">آنلاین</option><option value="in-person">حضوری</option><option value="hybrid">ترکیبی</option></select></div>
                <div><label className="block text-sm font-bold mb-1">سطح دوره</label><select value={formData.level} onChange={e => setFormData({...formData, level: e.target.value})} className="w-full px-4 py-2 rounded-xl border outline-none"><option value="beginner">مقدماتی</option><option value="intermediate">متوسط</option><option value="advanced">پیشرفته</option></select></div>
                <div><label className="block text-sm font-bold mb-1">قیمت آنلاین (تومان)</label><input type="number" value={formData.price_online} onChange={e => setFormData({...formData, price_online: e.target.value})} className="w-full px-4 py-2 rounded-xl border outline-none" /></div>
                <div><label className="block text-sm font-bold mb-1">قیمت حضوری (تومان)</label><input type="number" value={formData.price_in_person} onChange={e => setFormData({...formData, price_in_person: e.target.value})} className="w-full px-4 py-2 rounded-xl border outline-none" /></div>
                <div className="col-span-2"><label className="block text-sm font-bold mb-1">تگ‌ها (با ویرگول جدا کنید)</label><input type="text" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} className="w-full px-4 py-2 rounded-xl border outline-none" /></div>
              </div>
              <button disabled={isSubmitting} type="submit" className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl disabled:opacity-50">{editingCourse ? 'ذخیره تغییرات' : 'ثبت دوره'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
