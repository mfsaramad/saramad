'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useParams, useRouter } from 'next/navigation';
import { Loader2, ArrowRight, Plus, Video, Trash2 } from 'lucide-react';

export default function AdminCourseContentPage() {
  const { id } = useParams();
  const router = useRouter();
  const [course, setCourse] = useState<any>(null);
  const [chapters, setChapters] = useState<any[]>([]);
  const [newChapterTitle, setNewChapterTitle] = useState('');
  const [newLesson, setNewLesson] = useState({ title: '', video_url: '', chapter_id: '' });
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const { data: c } = await supabase.from('courses').select('*').eq('id', id).single();
    setCourse(c);
    const { data: ch } = await supabase.from('chapters').select(`*, lessons(*)`).eq('course_id', id).order('order_index');
    setChapters(ch || []);
    setIsLoading(false);
  };

  useEffect(() => { fetchData(); }, [id]);

  const addChapter = async () => {
    await supabase.from('chapters').insert({ course_id: id, title: newChapterTitle, order_index: chapters.length });
    setNewChapterTitle(''); fetchData();
  };

  const addLesson = async (chapterId: string) => {
    await supabase.from('lessons').insert({ chapter_id: chapterId, title: newLesson.title, video_url: newLesson.video_url });
    setNewLesson({...newLesson, title: '', video_url: ''}); fetchData();
  };

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-blue-600" /></div>;

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center gap-4">
        <button onClick={() => router.push('/admin/courses')}><ArrowRight className="w-6 h-6" /></button>
        <h1 className="text-2xl font-black">ظ…ط¯غŒط±غŒطھ ظ…ط­طھظˆط§: {course?.title}</h1>
      </div>
      
      <div className="bg-white p-4 rounded-xl flex gap-2">
        <input placeholder="ظ†ط§ظ… ظپطµظ„ ط¬ط¯غŒط¯" value={newChapterTitle} onChange={e => setNewChapterTitle(e.target.value)} className="border p-2 rounded-lg flex-1" />
        <button onClick={addChapter} className="bg-slate-800 text-white px-4 py-2 rounded-lg">ط§ظپط²ظˆط¯ظ† ظپطµظ„</button>
      </div>

      {chapters.map((ch, i) => (
        <div key={ch.id} className="bg-white p-4 rounded-xl border space-y-3">
          <h3 className="font-bold">ظپطµظ„ {i+1}: {ch.title}</h3>
          {ch.lessons?.map((ls: any) => (
            <div key={ls.id} className="flex justify-between bg-slate-50 p-2 rounded-lg text-sm"><span><Video className="w-4 h-4 inline mr-2"/>{ls.title}</span></div>
          ))}
          <div className="flex gap-2 mt-2">
            <input placeholder="ط¹ظ†ظˆط§ظ† ط¯ط±ط³" value={newLesson.title} onChange={e => setNewLesson({...newLesson, title: e.target.value})} className="border p-2 rounded-lg text-sm" />
            <input placeholder="ظ„غŒظ†ع© ظˆغŒط¯غŒظˆ" value={newLesson.video_url} onChange={e => setNewLesson({...newLesson, video_url: e.target.value})} className="border p-2 rounded-lg text-sm" dir="ltr"/>
            <button onClick={() => addLesson(ch.id)} className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm">ط§ظپط²ظˆط¯ظ†</button>
          </div>
        </div>
      ))}
    </div>
  );
}
