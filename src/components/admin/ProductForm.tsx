'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X, Loader2, Plus, Trash2 } from 'lucide-react';

export interface ProductFormData {
  id?: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  type: 'questions' | 'book' | 'video' | 'package';
  typeLabel: string;
  price: number;
  originalPrice?: number;
  icon: string;
  color: 'brand' | 'teal' | 'accent';
  rating: number;
  reviewsCount: number;
  salesCount: number;
  badge?: string;
  features: string[];
  format?: string;
  fileSize?: string;
  pages?: number;
  duration?: number;
  tags: string[];
  isActive: boolean;
}

interface Props {
  initialData?: Partial<ProductFormData>;
  onSubmit: (data: ProductFormData) => Promise<void> | void;
  mode: 'create' | 'edit';
}

const emptyForm: ProductFormData = {
  slug: '',
  title: '',
  description: '',
  longDescription: '',
  type: 'book',
  typeLabel: 'جزوه',
  price: 0,
  icon: '📚',
  color: 'brand',
  rating: 5,
  reviewsCount: 0,
  salesCount: 0,
  features: [],
  tags: [],
  isActive: true,
};

const TYPE_OPTIONS = [
  { value: 'questions', label: 'سوالات' },
  { value: 'book', label: 'جزوه' },
  { value: 'video', label: 'ویدیو' },
  { value: 'package', label: 'پکیج' },
];

const COLOR_OPTIONS = [
  { value: 'brand', label: 'آبی (Brand)' },
  { value: 'teal', label: 'فیروزه‌ای (Teal)' },
  { value: 'accent', label: 'نارنجی (Accent)' },
];

export function ProductForm({ initialData, onSubmit, mode }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<ProductFormData>({
    ...emptyForm,
    ...initialData,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [featureInput, setFeatureInput] = useState('');
  const [tagInput, setTagInput] = useState('');

  const update = <K extends keyof ProductFormData>(
    key: K,
    value: ProductFormData[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const addFeature = () => {
    if (featureInput.trim() && !form.features.includes(featureInput.trim())) {
      update('features', [...form.features, featureInput.trim()]);
      setFeatureInput('');
    }
  };

  const removeFeature = (f: string) => {
    update('features', form.features.filter((x) => x !== f));
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
    if (!form.description.trim()) return setError('توضیحات الزامی است');

    setLoading(true);
    try {
      await onSubmit(form);
      window.location.href = '/admin/products';
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

      {/* اطلاعات پایه */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
        <h2 className="font-bold text-gray-900 dark:text-white text-lg">
          اطلاعات پایه
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              عنوان محصول *
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => update('title', e.target.value)}
              placeholder="مثلاً: جزوه جامع پایتون"
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
              placeholder="python-book"
              dir="ltr"
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-blue-500 outline-none text-sm text-left"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              نوع محصول
            </label>
            <select
              value={form.type}
              onChange={(e) => {
                const type = e.target.value as any;
                const option = TYPE_OPTIONS.find((o) => o.value === type);
                update('type', type);
                if (option) update('typeLabel', option.label);
              }}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none text-sm"
            >
              {TYPE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              توضیح کوتاه *
            </label>
            <input
              type="text"
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
              placeholder="یک جمله کوتاه"
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none text-sm"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              توضیحات کامل
            </label>
            <textarea
              value={form.longDescription}
              onChange={(e) => update('longDescription', e.target.value)}
              rows={4}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none text-sm resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              آیکون (Emoji)
            </label>
            <input
              type="text"
              value={form.icon}
              onChange={(e) => update('icon', e.target.value)}
              placeholder="📚"
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              رنگ
            </label>
            <select
              value={form.color}
              onChange={(e) => update('color', e.target.value as any)}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none text-sm"
            >
              {COLOR_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              برچسب (اختیاری)
            </label>
            <input
              type="text"
              value={form.badge || ''}
              onChange={(e) => update('badge', e.target.value)}
              placeholder="مثلاً: پرفروش"
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none text-sm"
            />
          </div>
        </div>
      </div>

      {/* قیمت و آمار */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
        <h2 className="font-bold text-gray-900 dark:text-white text-lg">
          قیمت و آمار
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              قیمت (تومان)
            </label>
            <input
              type="number"
              value={form.price}
              onChange={(e) => update('price', Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              قیمت قبل از تخفیف
            </label>
            <input
              type="number"
              value={form.originalPrice || 0}
              onChange={(e) =>
                update('originalPrice', Number(e.target.value) || undefined)
              }
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              امتیاز (۰-۵)
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={form.rating}
              onChange={(e) => update('rating', Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              تعداد نظرات
            </label>
            <input
              type="number"
              value={form.reviewsCount}
              onChange={(e) => update('reviewsCount', Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              تعداد فروش
            </label>
            <input
              type="number"
              value={form.salesCount}
              onChange={(e) => update('salesCount', Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none text-sm"
            />
          </div>
        </div>
      </div>

      {/* مشخصات فایل */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
        <h2 className="font-bold text-gray-900 dark:text-white text-lg">
          مشخصات فایل (اختیاری)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              فرمت
            </label>
            <input
              type="text"
              value={form.format || ''}
              onChange={(e) => update('format', e.target.value)}
              placeholder="PDF, MP4, ..."
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              حجم فایل
            </label>
            <input
              type="text"
              value={form.fileSize || ''}
              onChange={(e) => update('fileSize', e.target.value)}
              placeholder="۲۵ مگابایت"
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              تعداد صفحات
            </label>
            <input
              type="number"
              value={form.pages || 0}
              onChange={(e) =>
                update('pages', Number(e.target.value) || undefined)
              }
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none text-sm"
            />
          </div>
        </div>
      </div>

      {/* ویژگی‌ها */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
        <h2 className="font-bold text-gray-900 dark:text-white text-lg">
          ویژگی‌ها
        </h2>

        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={featureInput}
            onChange={(e) => setFeatureInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === 'Enter' && (e.preventDefault(), addFeature())
            }
            placeholder="مثلاً: دسترسی مادام‌العمر"
            className="flex-1 px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none text-sm"
          />
          <button
            type="button"
            onClick={addFeature}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm transition"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2">
          {form.features.map((f) => (
            <div
              key={f}
              className="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 text-sm"
            >
              <span className="text-gray-700 dark:text-gray-300">{f}</span>
              <button
                type="button"
                onClick={() => removeFeature(f)}
                className="text-red-500"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* تگ‌ها */}
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

      {/* وضعیت */}
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
              اگه غیرفعال باشه، محصول توی سایت نشون داده نمیشه
            </div>
          </div>
        </label>
      </div>

      {/* دکمه‌ها */}
      <div className="flex gap-3 justify-end">
        <button
          type="button"
          onClick={() => router.push('/admin/products')}
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
              {mode === 'create' ? 'افزودن محصول' : 'ذخیره تغییرات'}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
