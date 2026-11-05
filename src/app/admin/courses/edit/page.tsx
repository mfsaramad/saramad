'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Loader2, Save, ArrowRight, Plus, Trash2, Video, FileText } from 'lucide-react';
import Link from 'next/link';

function EditCourseForm() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<'general' | 'content'>('general');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  // استیت اطلاعات کلی دوره (شامل course_type)
  const [courseData, setCourseData] = useState({ title: '', description: '', price: 0, course_type: 'online' });
  
  // استیت‌های محتوا
  const [sections, setSections] = useState<any[]>([]);
  const [lessons, setLessons] = useState<any[]>([]);
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  
  // استیت فرم درس جدید
  const [lessonForm, setLessonForm] = useState({ title: '', video_url: '', html_content: '', is_free: false });

  useEffect(() => {
    if (!id) { router.push('/admin/courses'); return; }
    const fetchData = async () => {
      const { data: course } = await supabase.from('courses').select('*').eq('id', id).single();
      if (course) setCourseData({ 
        title: course.title || '', 
        description: course.description || '', 
        price: course.price || 0,
        course_type: course.course_type || 'online' // 👈 خواندن نوع دوره
      });

      const { data: secs } = await supabase.from('course_sections').select('*').eq('course_id', id).order('order_index');
      setSections(secs || []);

      if (secs && secs.length > 0) {
        const { data: less } = await supabase.from('course_lessons').select('*').in('section_id', secs.map(s => s.id)).order('order_index');
        setLessons(less || []);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [id, router]);

  const handleSaveGeneral = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await supabase.from('courses').update(courseData).eq('id', id);
    setIsSaving(false);
    alert('اطلاعات کلی با موفقیت ذخیره شد.');
  };

  const handleAddSection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSectionTitle) return;
    const { data } = await supabase.from('course_sections').insert({ course_id: id, title: newSectionTitle }).select().single();
    if (data) setSections([...sections, data]);
    setNewSectionTitle('');
  };

  const handleDeleteSection = async (secId: string) => {
    if (!confirm('آیا از حذف این سرفصل و تمام درس‌های آن مطمئن هستید؟')) return;
    await supabase.from('course_sections').delete().eq('id', secId);
    setSections(sections.filter(s => s.id !== secId));
    setLessons(lessons.filter(l => l.section_id !== secId));
  };

  const handleAddLesson = async (sectionId: string) => {
    if (!lessonForm.title) return alert('عنوان درس را وارد کنید.');
    const { data } = await supabase.from('course_lessons').insert({
      section_id: sectionId,
      title: lessonForm.title,
      video_url: lessonForm.video_url,
      html_content: lessonForm.html_content,
      is_free: lessonForm.is_free,
    }).select().single();
    
    if (data) {
      setLessons([...lessons, data]);
      setLessonForm({ title: '', video_url: '', html_content: '', is_free: false });
      setActiveSectionId(null);
    }
  };

  const handleDeleteLesson = async (lessonId: string) => {
    if (!confirm('حذف شود؟')) return;
    await supabase.from('course_lessons').delete().eq('id', lessonId);
    setLessons(lessons.filter(l => l.id !== lessonId));
  };

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 text-blue-600 animate-spin" /></div>;

  return (
    <div className="max-w-4xl mx-auto" dir="rtl">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/admin/courses" className="text-slate-500 hover:text-blue-600"><ArrowRight className="w-5 h-5" /></Link>
          <h1 className="text-2xl font-black text-slate-800">ویرایش دوره: {courseData.title}</h1>
        </div>
      </div>

      {/* تب‌ها */}
      <div className="flex border-b border-slate-200 mb-6">
        <button onClick={() => setActiveTab('general')} className={`px-6 py-3 font-bold text-sm border-b-2 transition-colors ${activeTab === 'general' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>اطلاعات کلی</button>
        <button onClick={() => setActiveTab('content')} className={`px-6 py-3 font-bold text-sm border-b-2 transition-colors ${activeTab === 'content' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>مدیریت محتوا (سرفصل‌ها)</button>
      </div>

      {/* تب اطلاعات کلی */}
      {activeTab === 'general' && (
        <form onSubmit={handleSaveGeneral} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-4">
          <div>
            <label className="block text-sm font-bold mb-1">عنوان دوره</label>
            <input type="text" value={courseData.title} onChange={e => setCourseData({...courseData, title: e.target.value})} className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50" required />
          </div>

          {/* 👈 فیلد نوع دوره در تب ویرایش */}
          <div>
            <label className="block text-sm font-bold mb-1">نوع برگزاری دوره</label>
            <select 
              value={courseData.course_type} 
              onChange={e => setCourseData({...courseData, course_type: e.target.value})} 
              className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 font-bold"
            >
              <option value="online">آنلاین</option>
              <option value="in-person">حضوری</option>
              <option value="hybrid">ترکیبی (حضوری + آنلاین)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold mb-1">توضیحات</label>
            <textarea value={courseData.description} onChange={e => setCourseData({...courseData, description: e.target.value})} className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50" rows={4} />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">قیمت (تومان)</label>
            <input type="number" value={courseData.price} onChange={e => setCourseData({...courseData, price: Number(e.target.value)})} className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50" required />
          </div>
          <button type="submit" disabled={isSaving} className="w-full bg-blue-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-800 disabled:opacity-50">
            {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />} ذخیره اطلاعات
          </button>
        </form>
      )}

      {/* تب مدیریت محتوا (همان کد قبلی) */}
      {activeTab === 'content' && (
        <div className="space-y-6">
          <form onSubmit={handleAddSection} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex gap-3">
            <input type="text" placeholder="عنوان سرفصل جدید (مثلاً: فصل اول)" value={newSectionTitle} onChange={e => setNewSectionTitle(e.target.value)} className="flex-1 p-3 rounded-xl border border-slate-200 bg-slate-50" />
            <button type="submit" className="bg-blue-700 text-white px-6 rounded-xl font-bold hover:bg-blue-800 flex items-center gap-2"><Plus className="w-5 h-5" /> افزودن سرفصل</button>
          </form>

          {sections.map((section) => (
            <div key={section.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-slate-50 p-4 flex items-center justify-between border-b border-slate-200">
                <h3 className="font-bold text-slate-800">{section.title}</h3>
                <div className="flex items-center gap-2">
                  <button onClick={() => setActiveSectionId(section.id)} className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 flex items-center gap-1"><Plus className="w-4 h-4" /> افزودن درس</button>
                  <button onClick={() => handleDeleteSection(section.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>

              {activeSectionId === section.id && (
                <div className="p-4 bg-blue-50/50 border-b border-blue-100 space-y-3">
                  <input type="text" placeholder="عنوان درس" value={lessonForm.title} onChange={e => setLessonForm({...lessonForm, title: e.target.value})} className="w-full p-2.5 rounded-lg border border-slate-200 text-sm" />
                  <input type="text" placeholder="لینک ویدیو (اختیاری)" value={lessonForm.video_url} onChange={e => setLessonForm({...lessonForm, video_url: e.target.value})} className="w-full p-2.5 rounded-lg border border-slate-200 text-sm" dir="ltr" />
                  <textarea placeholder="متن HTML (اختیاری)..." value={lessonForm.html_content} onChange={e => setLessonForm({...lessonForm, html_content: e.target.value})} className="w-full p-2.5 rounded-lg border border-slate-200 text-sm font-mono" rows={3} dir="ltr" />
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 text-sm font-bold"><input type="checkbox" checked={lessonForm.is_free} onChange={e => setLessonForm({...lessonForm, is_free: e.target.checked})} /> پیش‌نمایش رایگان</label>
                    <button onClick={() => handleAddLesson(section.id)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700">ثبت درس</button>
                    <button onClick={() => setActiveSectionId(null)} className="text-slate-500 text-sm hover:text-slate-800">انصراف</button>
                  </div>
                </div>
              )}

              <div className="divide-y divide-slate-100">
                {lessons.filter(l => l.section_id === section.id).map((lesson, idx) => (
                  <div key={lesson.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">{idx + 1}</div>
                      <div>
                        <div className="font-bold text-sm text-slate-800">{lesson.title}</div>
                        <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                          {lesson.video_url && <span className="flex items-center gap-1"><Video className="w-3 h-3" /> ویدیو</span>}
                          {lesson.html_content && <span className="flex items-center gap-1"><FileText className="w-3 h-3" /> متن HTML</span>}
                          {lesson.is_free && <span className="text-green-600 font-bold bg-green-50 px-2 rounded-full">رایگان</span>}
                        </div>
                      </div>
                    </div>
                    <button onClick={() => handleDeleteLesson(lesson.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
                {lessons.filter(l => l.section_id === section.id).length === 0 && (
                  <div className="p-6 text-center text-sm text-slate-400">هنوز درسی به این سرفصل اضافه نشده است.</div>
                )}
              </div>
            </div>
          ))}
          
          {sections.length === 0 && (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-500">هنوز سرفصلی ساخته نشده است. اولین سرفصل را بسازید.</div>
          )}
        </div>
      )}
    </div>
  );
}

export default function EditCoursePage() {
  return <Suspense fallback={<div className="text-center py-20">در حال بارگذاری...</div>}><EditCourseForm /></Suspense>;
}