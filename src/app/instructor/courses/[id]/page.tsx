'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useParams, useRouter } from 'next/navigation';
import { Loader2, ArrowRight, Plus, Video, FileText, Code, File, ChevronDown, ChevronUp, Trash2 } from 'lucide-react';

export default function AdminCourseContentPage() {
  const { id } = useParams();
  const router = useRouter();
  const [course, setCourse] = useState<any>(null);
  const [chapters, setChapters] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newChapterTitle, setNewChapterTitle] = useState('');
  const [expandedChapter, setExpandedChapter] = useState<string | null>(null);
  
  // استیت‌های فرم درس
  const [lessonType, setLessonType] = useState<'video' | 'text' | 'pdf' | 'html'>('video');
  const [lessonData, setLessonData] = useState({ title: '', content: '', is_free: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => { fetchCourseData(); }, [id]);

  const fetchCourseData = async () => {
    setIsLoading(true);
    try {
      const { data: cData } = await supabase.from('courses').select('*').eq('id', id).single();
      setCourse(cData);
      const { data: chData } = await supabase.from('chapters').select(`*, lessons(*)`).eq('course_id', id).order('order_index');
      setChapters(chData || []);
    } catch (error) { console.error(error); } finally { setIsLoading(false); }
  };

  const addChapter = async () => {
    if (!newChapterTitle.trim()) return alert('نام فصل را وارد کنید.');
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('chapters').insert({ course_id: id, title: newChapterTitle, order_index: chapters.length });
      if (error) throw error;
      setNewChapterTitle(''); fetchCourseData();
    } catch (error: any) { alert('خطا در ساخت فصل: ' + error.message); } finally { setIsSubmitting(false); }
  };

  const addLesson = async (chapterId: string) => {
    if (!lessonData.title.trim()) return alert('نام درس را وارد کنید.');
    setIsSubmitting(true);
    try {
      const chapter = chapters.find(c => c.id === chapterId);
      
      // اگر نوع درس ویدیو بود، لینک در فیلد video_url ذخیره می‌شود، در غیر این صورت در فیلد content
      const videoUrl = lessonType === 'video' ? lessonData.content : '';
      const textContent = lessonType !== 'video' ? lessonData.content : '';

      const { error } = await supabase.from('lessons').insert({
        chapter_id: chapterId, 
        title: lessonData.title, 
        content: textContent, 
        video_url: videoUrl, 
        is_free: lessonData.is_free, 
        order_index: chapter.lessons?.length || 0
      });
      if (error) throw error;
      setLessonData({ title: '', content: '', is_free: false }); fetchCourseData();
    } catch (error: any) { alert('خطا در ساخت درس: ' + error.message); } finally { setIsSubmitting(false); }
  };

  const deleteChapter = async (chapterId: string) => {
    if(!confirm('حذف شود؟')) return; await supabase.from('chapters').delete().eq('id', chapterId); fetchCourseData();
  };
  const deleteLesson = async (lessonId: string) => {
    if(!confirm('حذف شود؟')) return; await supabase.from('lessons').delete().eq('id', lessonId); fetchCourseData();
  };

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 text-blue-600 animate-spin" /></div>;

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-6">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/instructor')} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition">
            <ArrowRight className="w-5 h-5 text-slate-700" />
          </button>
          <div>
            <h1 className="text-xl font-black text-slate-800">مدیریت محتوا: {course?.title}</h1>
          </div>
        </div>
        <button onClick={() => router.push('/instructor')} className="flex items-center gap-2 text-sm font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-xl transition">
          بازگشت به داشبورد
        </button>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {chapters.map((chapter, index) => (
            <div key={chapter.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="flex items-center justify-between p-4 bg-slate-50 cursor-pointer" onClick={() => setExpandedChapter(expandedChapter === chapter.id ? null : chapter.id)}>
                <div className="flex items-center gap-3 font-bold text-slate-800">
                  {expandedChapter === chapter.id ? <ChevronUp className="w-5 h-5 text-blue-600" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                  فصل {index + 1}: {chapter.title}
                </div>
                <button onClick={(e) => { e.stopPropagation(); deleteChapter(chapter.id); }} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
              </div>
              
              {expandedChapter === chapter.id && (
                <div className="p-4 border-t border-slate-100 space-y-4">
                  {chapter.lessons?.map((lesson: any) => (
                    <div key={lesson.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-3">
                        {lesson.video_url ? <Video className="w-4 h-4 text-teal-600" /> : <FileText className="w-4 h-4 text-blue-600" />}
                        <span className="text-sm font-bold text-slate-700">{lesson.title}</span>
                      </div>
                      <button onClick={() => deleteLesson(lesson.id)} className="text-slate-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  ))}
                  
                  <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 space-y-3 mt-4">
                    <div className="flex gap-2 mb-2">
                      <button onClick={() => { setLessonType('video'); setLessonData({...lessonData, content: ''}); }} className={`px-3 py-1 text-xs font-bold rounded-lg ${lessonType === 'video' ? 'bg-blue-600 text-white' : 'bg-white text-slate-600'}`}>ویدیو</button>
                      <button onClick={() => { setLessonType('text'); setLessonData({...lessonData, content: ''}); }} className={`px-3 py-1 text-xs font-bold rounded-lg ${lessonType === 'text' ? 'bg-blue-600 text-white' : 'bg-white text-slate-600'}`}>متن</button>
                      <button onClick={() => { setLessonType('html'); setLessonData({...lessonData, content: ''}); }} className={`px-3 py-1 text-xs font-bold rounded-lg ${lessonType === 'html' ? 'bg-blue-600 text-white' : 'bg-white text-slate-600'}`}>HTML</button>
                      <button onClick={() => { setLessonType('pdf'); setLessonData({...lessonData, content: ''}); }} className={`px-3 py-1 text-xs font-bold rounded-lg ${lessonType === 'pdf' ? 'bg-blue-600 text-white' : 'bg-white text-slate-600'}`}>PDF</button>
                    </div>

                    <input type="text" placeholder="عنوان درس" value={lessonData.title} onChange={e => setLessonData({...lessonData, title: e.target.value})} className="w-full px-3 py-2 rounded-lg border text-sm" />
                    
                    {/* فیلدهای شرطی بر اساس نوع درس */}
                    {lessonType === 'video' && (
                      <input type="text" placeholder="لینک ویدیو (YouTube یا ...)" value={lessonData.content} onChange={e => setLessonData({...lessonData, content: e.target.value})} className="w-full px-3 py-2 rounded-lg border text-sm" dir="ltr" />
                    )}
                    {(lessonType === 'text' || lessonType === 'html') && (
                      <textarea placeholder={lessonType === 'html' ? "کدهای HTML را وارد کنید..." : "متن درس را وارد کنید..."} value={lessonData.content} onChange={e => setLessonData({...lessonData, content: e.target.value})} className="w-full px-3 py-2 rounded-lg border text-sm h-24" dir={lessonType === 'html' ? 'ltr' : 'rtl'} />
                    )}
                    {lessonType === 'pdf' && (
                      <input type="text" placeholder="لینک فایل PDF" value={lessonData.content} onChange={e => setLessonData({...lessonData, content: e.target.value})} className="w-full px-3 py-2 rounded-lg border text-sm" dir="ltr" />
                    )}

                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 text-sm font-bold"><input type="checkbox" checked={lessonData.is_free} onChange={e => setLessonData({...lessonData, is_free: e.target.checked})} /> رایگان</label>
                      <button onClick={() => addLesson(chapter.id)} disabled={isSubmitting} className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg disabled:opacity-50">افزودن درس</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          {chapters.length === 0 && <div className="text-center py-10 bg-white rounded-2xl border text-slate-500">هنوز فصلی ساخته نشده است.</div>}
        </div>
        
        <div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm sticky top-24">
            <h3 className="font-black text-slate-800 mb-4">افزودن فصل جدید</h3>
            <input type="text" placeholder="مثلاً: مقدمه و آشنایی" value={newChapterTitle} onChange={e => setNewChapterTitle(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border mb-3 text-sm" />
            <button onClick={addChapter} disabled={isSubmitting} className="w-full py-2.5 bg-slate-800 text-white font-bold rounded-xl flex justify-center gap-2 disabled:opacity-50">
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Plus className="w-4 h-4" /> ساخت فصل</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

