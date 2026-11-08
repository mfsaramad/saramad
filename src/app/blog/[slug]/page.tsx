'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useParams } from 'next/navigation';
import { Loader2, Calendar, Eye, ArrowRight, User } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { toPersianNumber } from '@/lib/format';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*, users:author_id (name)')
          .eq('slug', slug)
          .eq('is_published', true)
          .single();
        
        if (error) throw error;
        
        setPost({
          ...data,
          author: data.users?.name || 'مدیر سیستم'
        });

        await supabase
          .from('blog_posts')
          .update({ views_count: (data.views_count || 0) + 1 })
          .eq('id', data.id);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    if (slug) fetchPost();
  }, [slug]);

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-blue-600" /></div>;

  if (!post) return (
    <div className="text-center py-20" dir="rtl">
      <h1 className="text-2xl font-bold text-slate-800 mb-4">مقاله یافت نشد</h1>
      <Link href="/blog" className="text-blue-600 hover:underline">بازگشت به وبلاگ</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-16" dir="rtl">
      {/* هدر ساده */}
      <div className="bg-slate-900 py-4">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/blog" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition text-sm">
            <ArrowRight className="w-4 h-4" /> بازگشت به وبلاگ
          </Link>
        </div>
      </div>

      {/* تصویر کاور - نمایش کامل بدون برش */}
      {post.cover_image && (
        <div className="w-full max-w-5xl mx-auto px-4 mt-6">
          <div className="relative w-full rounded-3xl overflow-hidden shadow-lg border border-slate-200 bg-slate-100">
            <Image 
              src={post.cover_image} 
              alt={post.title} 
              width={1200}
              height={800}
              className="w-full h-auto object-contain" 
              priority
            />
          </div>
        </div>
      )}

      {/* محتوای مقاله */}
      <div className="max-w-4xl mx-auto px-4 mt-8">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-md text-xs font-bold">{post.category}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-800 leading-tight mb-6">{post.title}</h1>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 mb-8 pb-8 border-b border-slate-100">
            <span className="flex items-center gap-1.5"><User className="w-4 h-4" /> {post.author}</span>
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {new Date(post.created_at).toLocaleDateString('fa-IR')}</span>
            <span className="flex items-center gap-1.5"><Eye className="w-4 h-4" /> {toPersianNumber(post.views_count || 0)} بازدید</span>
          </div>

          {post.excerpt && (
            <p className="text-lg text-slate-600 leading-relaxed font-medium mb-8 pb-8 border-b border-slate-100 italic">
              {post.excerpt}
            </p>
          )}
          
          <div className="prose prose-lg prose-slate max-w-none leading-loose whitespace-pre-line text-slate-700">
            {post.content}
          </div>
        </div>
      </div>
    </div>
  );
}