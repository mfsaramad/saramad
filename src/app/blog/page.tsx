'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Loader2, Calendar, Eye, ArrowLeft, BookOpen } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { toPersianNumber } from '@/lib/format';

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('is_published', true)
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setPosts(data || []);
      } catch (err) {
        console.error('خطا در دریافت مقالات:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-blue-600" /></div>;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-16" dir="rtl">
      <div className="bg-gradient-to-br from-[#1e3a8a] to-[#0d9488] pt-32 pb-16 mb-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-black text-white mb-4 flex items-center justify-center gap-3">
            <BookOpen className="w-10 h-10" /> وبلاگ سرآمد
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            جدیدترین مقالات، آموزش‌ها و اخبار دنیای فنی و حرفه‌ای را اینجا بخوانید.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {posts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
            <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-slate-700 mb-2">هنوز مقاله‌ای منتشر نشده است</h2>
            <p className="text-slate-500">به زودی مطالب جدیدی در این بخش قرار می‌گیرد.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
              <article key={post.id} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col">
                <Link href={`/blog/${post.slug}`} className="block relative aspect-video overflow-hidden bg-slate-100">
                  {post.cover_image ? (
                    <Image 
                      src={post.cover_image} 
                      alt={post.title} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-teal-100">
                      <BookOpen className="w-16 h-16 text-blue-300" />
                    </div>
                  )}
                </Link>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                    <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md font-bold">{post.category}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {new Date(post.created_at).toLocaleDateString('fa-IR')}</span>
                  </div>
                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="text-lg font-black text-slate-800 mb-3 line-clamp-2 hover:text-blue-700 transition">{post.title}</h2>
                  </Link>
                  <p className="text-sm text-slate-500 line-clamp-3 mb-4 flex-1">{post.excerpt || post.content.substring(0, 100) + '...'}</p>
                  <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-1 text-sm font-bold text-blue-700 hover:gap-2 transition-all">
                    ادامه مطلب <ArrowLeft className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}