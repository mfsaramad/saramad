'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useParams } from 'next/navigation';
import { Loader2, ArrowRight, Plus, Trash2, Video, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';

export default function TeacherCourseContentPage() {
  const params = useParams();
  const courseId = params.id as string;

  const [course, setCourse] = useState<any>(null);
  const [chapters, setChapters] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingChapter, setIsAddingChapter] = useState(false);
  const [newChapterTitle, setNewChapterTitle] = useState('');
  
  const [openChapterId, setOpenChapterId] = useState<string | null>(null);
  const [newLesson, setNewLesson] = useState({ title: '', type: 'video', url: '', content: '' });
  const [isAddingLesson, setIsAddingLesson] = useState(false);

  const fetchData = async () => {
    try {
      const { data: courseData, error: courseError } = await supabase
        .from('courses')
        .select('*')
        .eq('id', courseId)
        .single();
      
      if (courseError) throw courseError;
      setCourse(courseData);

      const { data: chaptersData, error: chaptersError } = await supabase
        .from('chapters')
        .select('*')
        .eq('course_id', courseId)
        .order('order_index', { ascending: true });
      
      if (chaptersError) throw chaptersError;

      const chaptersWithLessons = await Promise.all((chaptersData || []).map(async (chapter) => {
        const { data: lessonsData } = await supabase
          .from('lessons')
          .select('*')
          .eq('chapter_id', chapter.id)
          .order('order_index', { ascending: true });
        return { ...chapter, lessons: lessonsData || [] };
      }));

      setChapters(chaptersWithLessons);
    } catch (err) {
      console.error('خطا در دریافت اطلاعات:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (courseId) fetchData();
  }, [courseId]);

  const handleAddChapter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChapterTitle.trim()) return;
    setIsAddingChapter(true);
    try {
      const { error } = await supabase.from('chapters').insert({
        course_id: courseId,
        title: newChapterTitle,
        order_index: chapters.length,
      });
      if (error) throw error;
      setNewChapterTitle('');
      fetchData();
    } catch (err: any) {
      alert('خطا: ' + err.message);
    } finally {
      setIsAddingChapter(false);
    }
  };

  const handleDeleteChapter = async (id: string) => {
    if (!confirm('آیا از حذف این فصل مطمئن هستید؟ تمام درس‌های آن نیز حذف می‌شوند.')) return;
    await supabase.from('chapters').delete().eq('id', id);
    fetchData();
  };

  const handleAddLesson = async (chapterId: string) => {
    if (!newLesson.title.trim()) return;
    setIsAddingLesson(true);
    try {
      const { error } = await supabase.from('lessons').insert({
        chapter_id: chapterId,
        title: newLesson.title,
        type: newLesson.type,
        video_url: newLesson.type === 'video' ? newLesson.url : null,
        content: newLesson.type === 'text' ? newLesson.content : null,
        order_index: 0,
      });
      if (error) throw error;
      setNewLesson({ title: '', type: 'video', url: '', content: '' });
      fetchData();
    } catch (err: any) {
      alert('خطا: ' + err.message);
    } finally {
      setIsAddingLesson(false);
    }
  };

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-blue-600" /></div>;
  if (!course) return <div className="text-center py-20 text-red-500">دوره یافت نشد.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6" dir="rtl">
      <div className="flex items-center gap-3 mb-6">
        <Link href={`/instructor/courses/${courseId}`} className="text-slate-400 hover:text-slate-800"><ArrowRight className="w-5 h-5" /></Link>
        <div>
          <h1 className="text-2xl font-black text-slate-800">مدیریت محتوای دوره: {course.title}</h1>
          <p className="text-sm text-slate-500">فصل‌ها و درس‌های این دوره را مدیریت کنید.</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h2 className="text-lg font-bold text-slate-800 mb-4">افزودن فصل جدید</h2>
        <form onSubmit={handleAddChapter} className="flex gap-3">
          <input 
            required 
            type="text" 
            value={newChapterTitle} 
            onChange={e => setNewChapterTitle(e.target.value)} 
            className="flex-1 p-3 border rounded-xl outline-none focus:border-blue-500" 
            placeholder="مثلاً: فصل اول - مقدمات" 
          />
          <button disabled={isAddingChapter} type="submit" className="px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition flex items-center gap-2 disabled:opacity-50">
            {isAddingChapter ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Plus className="w-5 h-5" /> افزودن</>}
          </button>
        </form>
      </div>

      <div className="space-y-4">
        {chapters.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-slate-300 text-slate-500">
            هنوز فصلی برای این دوره ایجاد نشده است.
          </div>
        ) : (
          chapters.map((chapter, idx) => (
            <div key={chapter.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div 
                className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition"
                onClick={() => setOpenChapterId(openChapterId === chapter.id ? null : chapter.id)}
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">{idx + 1}</span>
                  <h3 className="font-bold text-slate-800">{chapter.title}</h3>
                  <span className="text-xs text-slate-400">({chapter.lessons.length} درس)</span>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={(e) => { e.stopPropagation(); handleDeleteChapter(chapter.id); }} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  {openChapterId === chapter.id ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </div>
              </div>

              {openChapterId === chapter.id && (
                <div className="p-5 border-t border-slate-100 bg-slate-50 space-y-4">
                  {chapter.lessons.length > 0 && (
                    <div className="space-y-2">
                      {chapter.lessons.map((lesson: any) => (
                        <div key={lesson.id} className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200">
                          <div className="flex items-center gap-2">
                            {lesson.type === 'video' ? <Video className="w-4 h-4 text-blue-500" /> : <FileText className="w-4 h-4 text-green-500" />}
                            <span className="text-sm font-medium text-slate-700">{lesson.title}</span>
                          </div>
                          <button 
                            onClick={async () => {
                              if (!confirm('حذف این درس؟')) return;
                              await supabase.from('lessons').delete().eq('id', lesson.id);
                              fetchData();
                            }}
                            className="text-red-500 hover:bg-red-50 p-1.5 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                    <p className="text-sm font-bold text-slate-700">افزودن درس جدید به این فصل:</p>
                    <input 
                      type="text" 
                      value={newLesson.title} 
                      onChange={e => setNewLesson({...newLesson, title: e.target.value})} 
                      className="w-full p-2 border rounded-lg outline-none focus:border-blue-500 text-sm" 
                      placeholder="عنوان درس" 
                    />
                    <div className="flex gap-2">
                      <select 
                        value={newLesson.type} 
                        onChange={e => setNewLesson({...newLesson, type: e.target.value})} 
                        className="p-2 border rounded-lg outline-none text-sm bg-white"
                      >
                        <option value="video">ویدیو</option>
                        <option value="text">متن</option>
                      </select>
                      {newLesson.type === 'video' ? (
                        <input 
                          type="text" 
                          value={newLesson.url} 
                          onChange={e => setNewLesson({...newLesson, url: e.target.value})} 
                          className="flex-1 p-2 border rounded-lg outline-none text-sm text-left" 
                          placeholder="لینک ویدیو (یوتیوب/آپارات)" 
                          dir="ltr"
                        />
                      ) : (
                        <input 
                          type="text" 
                          value={newLesson.content} 
                          onChange={e => setNewLesson({...newLesson, content: e.target.value})} 
                          className="flex-1 p-2 border rounded-lg outline-none text-sm" 
                          placeholder="متن درس" 
                        />
                      )}
                    </div>
                    <button 
                      onClick={() => handleAddLesson(chapter.id)} 
                      disabled={isAddingLesson || !newLesson.title.trim()}
                      className="w-full py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-lg transition disabled:opacity-50 flex items-center justify-center gap-1"
                    >
                      {isAddingLesson ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Plus className="w-4 h-4" /> ثبت درس</>}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}