'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Loader2 } from 'lucide-react';
import { BlogForm, type BlogFormData } from '@/components/admin/BlogForm';
import { useDb } from '@/hooks/useDb';

interface BlogPost {
  id: string;
  [key: string]: any;
}

function EditBlogContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || '';

  const { items: posts, update, isLoading } = useDb<BlogPost>('blogPosts');
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    if (!isLoading && id) {
      const found = posts.find((p) => p.id === id);
      if (found) setPost(found);
    }
  }, [id, posts, isLoading]);

  const handleSubmit = async (data: BlogFormData) => {
    if (id) update(id, data as any);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!id) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          شناسه مقاله مشخص نشده
        </h2>
        <Link
          href="/admin/blog"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          بازگشت به لیست
        </Link>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          مقاله یافت نشد
        </h2>
        <Link
          href="/admin/blog"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          بازگشت به لیست
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/blog"
          className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <ArrowRight className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            ویرایش مقاله
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            {post.title}
          </p>
        </div>
      </div>

      <BlogForm initialData={post} onSubmit={handleSubmit} mode="edit" />
    </div>
  );
}

export default function EditBlogPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      }
    >
      <EditBlogContent />
    </Suspense>
  );
}