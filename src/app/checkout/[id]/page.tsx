'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useParams, useRouter } from 'next/navigation';
import { Loader2, CreditCard, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function CheckoutPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [course, setCourse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaying, setIsPaying] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    supabase.from('courses').select('*').eq('id', id).single().then(({data}) => {
      setCourse(data); setIsLoading(false);
    });
  }, [id]);

  const handlePay = async () => {
    if(!user) return alert('ظ„ط·ظپط§ ط§ط¨طھط¯ط§ ظˆط§ط±ط¯ ط´ظˆغŒط¯');
    setIsPaying(true);
    // ط´ط¨غŒظ‡â€Œط³ط§ط²غŒ ط¯ط±ع¯ط§ظ‡ ظ¾ط±ط¯ط§ط®طھ
    await new Promise(r => setTimeout(r, 1500));
    
    // ط«ط¨طھ ط³ظپط§ط±ط´ ط¯ط± ط¯غŒطھط§ط¨غŒط³
    await supabase.from('orders').insert({ user_id: user.id, course_id: id, amount: 1000000, status: 'paid' });
    
    setIsPaying(false);
    setIsDone(true);
  };

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-blue-600 w-10 h-10"/></div>;

  if (isDone) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]" dir="rtl">
      <CheckCircle className="w-20 h-20 text-green-500 mb-4"/>
      <h2 className="text-2xl font-black">ظ¾ط±ط¯ط§ط®طھ ط¨ط§ ظ…ظˆظپظ‚غŒطھ ط§ظ†ط¬ط§ظ… ط´ط¯!</h2>
      <p className="text-slate-500 mt-2">ط§غŒظ† ط¯ظˆط±ظ‡ ط¨ظ‡ ط¯ظˆط±ظ‡â€Œظ‡ط§غŒ ط´ظ…ط§ ط§ط¶ط§ظپظ‡ ط´ط¯.</p>
      <button onClick={() => router.push('/dashboard')} className="mt-6 bg-slate-800 text-white px-6 py-2 rounded-xl">ظˆط±ظˆط¯ ط¨ظ‡ ط¯ظˆط±ظ‡</button>
    </div>
  );

  return (
    <div className="flex items-center justify-center min-h-[70vh] p-4" dir="rtl">
      <div className="bg-white p-8 rounded-3xl shadow-lg border max-w-md w-full text-center">
        <h1 className="text-2xl font-black mb-2">ط«ط¨طھâ€Œظ†ط§ظ… ط¯ط± ط¯ظˆط±ظ‡</h1>
        <p className="text-slate-500 mb-6">{course?.title}</p>
        <div className="text-3xl font-black text-blue-700 mb-8">غ±,غ°غ°غ°,غ°غ°غ° طھظˆظ…ط§ظ†</div>
        <button onClick={handlePay} disabled={isPaying} className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition">
          {isPaying ? <Loader2 className="animate-spin w-5 h-5"/> : <><CreditCard className="w-5 h-5"/> ظ¾ط±ط¯ط§ط®طھ ط¢ظ†ظ„ط§غŒظ†</>}
        </button>
      </div>
    </div>
  );
}
