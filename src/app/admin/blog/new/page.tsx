'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { BlogForm, type BlogFormData } from '@/components/admin/BlogForm';
import { useDb } from '@/hooks/useDb';

export default function NewBlogPage() {
  const { add } = useDb('blogPosts');

  const handleSubmit = async (data: BlogFormData) => {
    add(data as any);
  };

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
            افزودن مقاله جدید
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            اطلاعات مقاله رو پر کن و ذخیره کن
          </p>
        </div>
      </div>

      <BlogForm onSubmit={handleSubmit} mode="create" />
    </div>
  );
}