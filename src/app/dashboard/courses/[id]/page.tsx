'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useParams, useRouter } from 'next/navigation';
import { Loader2, ArrowRight, PlayCircle } from 'lucide-react';

export default function StudentCoursePlayerPage() {
  const { id } = useParams();
  const router = useRouter();
  const [course, setCourse] = useState<any>(null);
  const [chapters, setChapters] = useState<any[]>([]);
  const [activeLesson, setActiveLesson] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: c } = await supabase.from('courses').select('*').eq('id', id).single();
      setCourse(c);
      const { data: ch } = await supabase.from('chapters').select(`*, lessons(*)`).eq('course_id', id);
      if (ch && ch.length > 0) {
        setChapters(ch);
        const first = ch.find((c:any) => c.lessons?.length > 0)?.lessons[0];
        if (first) setActiveLesson(first);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-blue-600" /></div>;

  return (
    <div className="bg-slate-50 min-h-screen p-4 flex gap-6 flex-col lg:flex-row" dir="rtl">
      <div className="flex-1 space-y-4">
        <button onClick={() => router.push('/dashboard')} className="flex items-center gap-2 font-bold"><ArrowRight className="w-5 h-5"/> بازگشت</button>
        <div className="bg-black aspect-video rounded-2xl overflow-hidden flex items-center justify-center">
          {activeLesson?.video_url ? (
            <iframe src={activeLesson.video_url.replace('watch?v=', 'embed/')} className="w-full h-full" allowFullScreen />
          ) : <p className="text-white">ویدیو انتخاب نشده است</p>}
        </div>
        <h2 className="text-xl font-black">{activeLesson?.title}</h2>
        <p className="text-slate-500">دوره: {course?.title}</p>
      </div>
      <div className="w-full lg:w-80 bg-white rounded-2xl border h-[80vh] overflow-y-auto p-2">
        <div className="font-bold p-3 bg-slate-800 text-white rounded-t-xl mb-2">سرفصل‌ها</div>
        {chapters.map((c, i) => (
          <div key={c.id} className="mb-2">
            <div className="font-bold text-sm bg-slate-100 p-2">فصل {i+1}: {c.title}</div>
            {c.lessons?.map((l: any) => (
              <button key={l.id} onClick={() => setActiveLesson(l)} className="w-full text-right p-2 text-sm flex items-center gap-2 hover:bg-blue-50">
                <PlayCircle className="w-4 h-4"/> {l.title}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
