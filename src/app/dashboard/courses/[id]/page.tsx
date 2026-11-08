'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useParams, useRouter } from 'next/navigation';
import { Loader2, ArrowRight, PlayCircle, Lock, FileText } from 'lucide-react';

export default function StudentCoursePlayerPage() {
  const { id } = useParams();
  const router = useRouter();
  const [course, setCourse] = useState<any>(null);
  const [chapters, setChapters] = useState<any[]>([]);
  const [activeLesson, setActiveLesson] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: cData, error: cError } = await supabase.from('courses').select('*').eq('id', id).single();
        if (cError) throw new Error("خطا در دریافت دوره: " + cError.message);
        setCourse(cData);
        
        const { data: chData, error: chError } = await supabase.from('chapters').select(`*, lessons(*)`).eq('course_id', id).order('order_index');
        if (chError) throw new Error("خطا در دریافت سرفصل‌ها: " + chError.message);
        
        if (chData && chData.length > 0) {
          const sortedChapters = chData.map(ch => ({ 
            ...ch, 
            lessons: ch.lessons?.sort((a: any, b: any) => a.order_index - b.order_index) 
          }));
          setChapters(sortedChapters);
          
          const firstLesson = sortedChapters.find(c => c.lessons?.length > 0)?.lessons[0];
          if (firstLesson) setActiveLesson(firstLesson);
        }
      } catch (error: any) { 
        setErrorMsg(error.message);
        console.error(error); 
      } finally { 
        setIsLoading(false); 
      }
    };
    if (id) fetchData();
  }, [id]);

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 text-blue-600 animate-spin" /></div>;

  if (errorMsg) {
    return (
      <div className="max-w-4xl mx-auto p-6" dir="rtl">
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl">
          <h3 className="font-bold mb-2">خطا:</h3>
          <p>{errorMsg}</p>
        </div>
      </div>
    );
  }

  const getVideoUrl = (lesson: any) => {
    if (!lesson) return null;
    if (lesson.video_url) return lesson.video_url;
    if (lesson.content && (lesson.content.includes('youtube') || lesson.content.includes('youtu.be') || lesson.content.startsWith('http'))) {
      return lesson.content;
    }
    return null;
  };

  const renderLessonContent = () => {
    if (!activeLesson) return <div className="text-center text-slate-500 py-20">درسی برای نمایش انتخاب نشده است. لطفاً از پنل ادمین برای این دوره فصل و درس بسازید.</div>;

    const videoUrl = getVideoUrl(activeLesson);

    if (videoUrl) {
      return (
        <div className="bg-black rounded-2xl overflow-hidden aspect-video relative flex items-center justify-center shadow-lg border border-slate-800">
          {videoUrl.includes('youtube') || videoUrl.includes('youtu.be') ? (
            <iframe 
              src={videoUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')} 
              className="w-full h-full" 
              allowFullScreen
            />
          ) : (
            <video src={videoUrl} controls className="w-full h-full" />
          )}
        </div>
      );
    }

    if (activeLesson.content) {
      if (activeLesson.content.includes('<') && activeLesson.content.includes('>')) {
        return <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm min-h-[300px] prose max-w-none" dangerouslySetInnerHTML={{ __html: activeLesson.content }} />;
      }
      return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm min-h-[300px]">
          <p className="whitespace-pre-wrap text-slate-700 leading-relaxed">{activeLesson.content}</p>
        </div>
      );
    }

    return <div className="text-center text-slate-500 py-20">محتوایی برای این درس ثبت نشده است.</div>;
  };

  return (
    <div className="bg-slate-50 min-h-screen" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-6 flex-col lg:flex-row">
        <div className="flex-1 space-y-4">
          <button onClick={() => router.push('/dashboard')} className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-800 mb-4 transition">
            <ArrowRight className="w-4 h-4" /> بازگشت به داشبورد
          </button>
          {renderLessonContent()}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm mt-4 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-black text-slate-800 mb-1">{activeLesson?.title || 'عنوان درس'}</h2>
              <p className="text-slate-500 text-sm">دوره: {course?.title}</p>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-96 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[80vh]">
          <div className="p-4 bg-slate-800 text-white font-black flex items-center gap-2"><PlayCircle className="w-5 h-5" /> سرفصل‌های دوره</div>
          <div className="overflow-y-auto flex-1 p-2 space-y-2">
            {chapters.map((chapter, idx) => (
              <div key={chapter.id} className="border border-slate-100 rounded-xl overflow-hidden">
                <div className="bg-slate-50 p-3 font-bold text-sm text-slate-800 border-b border-slate-100">فصل {idx + 1}: {chapter.title}</div>
                <div className="p-2 space-y-1">
                  {chapter.lessons?.map((lesson: any) => (
                    <button key={lesson.id} onClick={() => setActiveLesson(lesson)} className={`w-full text-right p-2.5 rounded-lg text-sm flex items-center justify-between transition-colors ${activeLesson?.id === lesson.id ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50 text-slate-600'}`}>
                      <span className="flex items-center gap-2">
                        {getVideoUrl(lesson) ? <PlayCircle className="w-4 h-4" /> : <FileText className="w-4 h-4" />} 
                        {lesson.title}
                      </span>
                      {lesson.is_free ? <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded">رایگان</span> : <Lock className="w-3 h-3 text-slate-400" />}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
