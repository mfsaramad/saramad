'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Loader2, ArrowRight, Save, UploadCloud } from 'lucide-react';
import Link from 'next/link';
import imageCompression from 'browser-image-compression';

export default function NewBlogPostPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    cover_image: '',
    category: 'عمومی',
    is_published: false,
  });

  // تولید خودکار Slug انگلیسی (برای جلوگیری از خطای 404)
  const generateSlug = () => {
    if (!formData.title) return;
    // در اینجا یک اسلاگ ساده تولید می‌کنیم. در نسخه واقعی می‌توان از کتابخانه‌های ترجمه استفاده کرد
    const generated = 'post-' + Math.floor(Math.random() * 100000);
    setFormData({ ...formData, slug: generated });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const options = {
        maxSizeMB: 0.2,
        maxWidthOrHeight: 1280,
        useWebWorker: true,
        initialQuality: 0.8,
        fileType: 'image/webp',
      };

      const compressedFile = await imageCompression(file, options);
      const fileName = `${Date.now()}.webp`;

      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(fileName, compressedFile, {
          contentType: 'image/webp',
          cacheControl: '3600',
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(fileName);

      setFormData(prev => ({ ...prev, cover_image: publicUrl }));
    } catch (err: any) {
      alert('خطا در آپلود و فشرده‌سازی تصویر: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { error } = await supabase.from('blog_posts').insert({
        title: formData.title,
        slug: formData.slug || 'post-' + Date.now(),
        content: formData.content,
        excerpt: formData.excerpt,
        cover_image: formData.cover_image,
        category: formData.category,
        is_published: formData.is_published,
        // author_id: user?.id,
      });
      if (error) throw error;
      router.push('/admin/blog');
    } catch (err: any) {
      alert('خطا: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6" dir="rtl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/blog" className="text-slate-400 hover:text-slate-800"><ArrowRight className="w-5 h-5" /></Link>
        <h1 className="text-2xl font-black text-slate-800">نوشتن مقاله جدید</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">عنوان مقاله *</label>
          <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-3 border border-slate-300 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition" placeholder="مثلاً: ۵ نکته کلیدی برای یادگیری نازک دوزی" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">آدرس اینترنتی (Slug) *</label>
            <div className="flex gap-2">
              <input required type="text" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full p-3 border border-slate-300 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition text-left" placeholder="learning-nazok-doozi" dir="ltr" />
              <button type="button" onClick={generateSlug} className="px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-bold transition whitespace-nowrap">تولید خودکار</button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">دسته‌بندی</label>
            <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full p-3 border border-slate-300 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition bg-white">
              <option value="عمومی">عمومی</option>
              <option value="آموزش">آموزش</option>
              <option value="مقالات">مقالات</option>
              <option value="اخبار">اخبار</option>
              <option value="نکات حرفه‌ای">نکات حرفه‌ای</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">تصویر کاور</label>
          <div className="flex flex-col gap-3">
            {formData.cover_image && (
              <img src={formData.cover_image} alt="Cover Preview" className="w-full h-48 object-cover rounded-xl border border-slate-200" />
            )}
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl cursor-pointer font-bold text-sm transition">
                {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
                {isUploading ? 'در حال آپلود...' : 'انتخاب و آپلود تصویر'}
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={isUploading} />
              </label>
              <span className="text-xs text-slate-400">یا لینک تصویر را وارد کنید:</span>
              <input type="text" value={formData.cover_image} onChange={e => setFormData({...formData, cover_image: e.target.value})} className="flex-1 p-2 border border-slate-300 rounded-xl outline-none focus:border-blue-500 text-left text-sm" placeholder="https://..." dir="ltr" />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">خلاصه مقاله (Excerpt)</label>
          <textarea value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} className="w-full p-3 border border-slate-300 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition" rows={2} placeholder="یک توضیح کوتاه که در لیست مقالات نمایش داده می‌شود..."></textarea>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">متن اصلی مقاله *</label>
          <textarea required value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full p-3 border border-slate-300 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition" rows={12} placeholder="متن کامل مقاله را اینجا بنویسید..."></textarea>
        </div>

        <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl">
          <input type="checkbox" id="publish" checked={formData.is_published} onChange={e => setFormData({...formData, is_published: e.target.checked})} className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer" />
          <label htmlFor="publish" className="text-sm font-bold text-slate-700 cursor-pointer">انتشار فوری مقاله (در غیر این صورت به عنوان پیش‌نویس ذخیره می‌شود)</label>
        </div>

        <button disabled={isLoading} type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition flex justify-center items-center gap-2 disabled:opacity-50">
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5" /> ذخیره مقاله</>}
        </button>
      </form>
    </div>
  );
}