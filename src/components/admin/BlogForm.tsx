'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X, Loader2, Plus } from 'lucide-react';

export interface BlogFormData {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover: string;
  category: string;
  author: string;
  date: string;
  readTime: number;
  tags: string[];
  isActive: boolean;
}

interface Props {
  initialData?: Partial<BlogFormData>;
  onSubmit: (data: BlogFormData) => Promise<void> | void;
  mode: 'create' | 'edit';
}

const emptyForm: BlogFormData = {
  slug: '',
  title: '',
  excerpt: '',
  content: '',
  cover: '/images/blog/default.jpg',
  category: 'برنامه‌نویسی',
  author: '',
  date: '',
  readTime: 5,
  tags: [],
  isActive: true,
};

const CATEGORY_OPTIONS = [
  'برنامه‌نویسی',
  'طراحی',
  'کسب‌وکار',
  'زبان',
  'موسیقی',
  'حسابداری',
  'عمومی',
];

export function BlogForm({ initialData, onSubmit, mode }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<BlogFormData>({
    ...emptyForm,
    ...initialData,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tagInput, setTagInput] = useState('');

  const update = <K extends keyof BlogFormData>(
    key: K,
    value: BlogFormData[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const addTag = () => {
    if (tagInput.trim() && !form.tags.includes(tagInput.trim())) {
      update('tags', [...form.tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (t: string) => {
    update('tags', form.tags.filter((x) => x !== t));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.title.trim()) return setError('عنوان الزامی است');
    if (!form.slug.trim()) return setError('slug الزامی است');
    if (!form.excerpt.trim()) return setError('خلاصه الزامی است');
    if (!form.author.trim()) return setError('نویسنده الزامی است');

    setLoading(true);
    try {
      await onSubmit(form);
      window.location.href = '/admin/blog';
    } catch (err: any) {
      setError(err.message || 'خطا در ذخیره');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
        <h2 className="font-bold text-gray-900 dark:text-white text-lg">
          اطلاعات پایه
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              عنوان مقاله *
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => update('title', e.target.value)}
              placeholder="مثلاً: چرا پایتون یاد بگیریم؟"
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-blue-500 outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Slug (آدرس) *
            </label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => update('slug', e.target.value)}
              placeholder="why-learn-python"
              dir="ltr"
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-blue-500 outline-none text-sm text-left"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              دسته‌بندی
            </label>
            <select
              value={form.category}
              onChange={(e) => update('category', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none text-sm"
            >
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              نویسنده *
            </label>
            <input
              type="text"
              value={form.author}
              onChange={(e) => update('author', e.target.value)}
              placeholder="مثلاً: دکتر علی محمدی"
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              تاریخ
            </label>
            <input
              type="text"
              value={form.date}
              onChange={(e) => update('date', e.target.value)}
              placeholder="۱۴۰۴/۰۸/۱۵"
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              زمان مطالعه (دقیقه)
            </label>
            <input
              type="number"
              value={form.readTime}
              onChange={(e) => update('readTime', Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none text-sm"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              آدرس تصویر کاور
            </label>
            <input
              type="text"
              value={form.cover}
              onChange={(e) => update('cover', e.target.value)}
              placeholder="/images/blog/example.jpg"
              dir="ltr"
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none text-sm text-left"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              خلاصه مقاله *
            </label>
            <textarea
              value={form.excerpt}
              onChange={(e) => update('excerpt', e.target.value)}
              rows={3}
              placeholder="یک پاراگراف کوتاه درباره مقاله"
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none text-sm resize-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              متن کامل مقاله
            </label>
            <textarea
              value={form.content}
              onChange={(e) => update('content', e.target.value)}
              rows={12}
              placeholder="متن کامل مقاله..."
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none text-sm resize-none"
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
        <h2 className="font-bold text-gray-900 dark:text-white text-lg">
          تگ‌ها
        </h2>

        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === 'Enter' && (e.preventDefault(), addTag())
            }
            placeholder="مثلاً: پایتون"
            className="flex-1 px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none text-sm"
          />
          <button
            type="button"
            onClick={addTag}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm transition"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {form.tags.map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm"
            >
              {t}
              <button
                type="button"
                onClick={() => removeTag(t)}
                className="hover:text-red-500"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={(e) => update('isActive', e.target.checked)}
            className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-blue-600"
          />
          <div>
            <div className="font-medium text-gray-900 dark:text-white">
              نمایش در سایت
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              اگه غیرفعال باشه، مقاله توی سایت نشون داده نمیشه
            </div>
          </div>
        </label>
      </div>

      <div className="flex gap-3 justify-end">
        <button
          type="button"
          onClick={() => router.push('/admin/blog')}
          className="px-6 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          انصراف
        </button>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium transition shadow-md shadow-blue-500/20"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              در حال ذخیره...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              {mode === 'create' ? 'افزودن مقاله' : 'ذخیره تغییرات'}
            </>
          )}
        </button>
      </div>
    </form>
  );
}