'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X, Loader2, Plus, Trash2 } from 'lucide-react';

export interface CourseFormData {
  id?: string;
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  mode: 'in-person' | 'online' | 'hybrid';
  level: string;
  duration: number;
  sessions: number;
  price: {
    'in-person'?: number;
    online?: number;
    hybrid?: number;
  };
  image: string;
  instructorId: string;
  capacity: number;
  remainingCapacity: number;
  startDate: string;
  schedule: string;
  prerequisites: string[];
  certificate: boolean;
  tags: string[];
  isActive: boolean;
}

interface Props {
  initialData?: Partial<CourseFormData>;
  instructors: { id: string; name: string }[];
  onSubmit: (data: CourseFormData) => Promise<void> | void;
  mode: 'create' | 'edit';
}

const emptyForm: CourseFormData = {
  slug: '',
  title: '',
  description: '',
  shortDescription: '',
  mode: 'online',
  level: 'beginner',
  duration: 60,
  sessions: 30,
  price: { 'in-person': 0, online: 0, hybrid: 0 },
  image: '/images/courses/default.jpg',
  instructorId: '',
  capacity: 30,
  remainingCapacity: 30,
  startDate: '',
  schedule: '',
  prerequisites: [],
  certificate: true,
  tags: [],
  isActive: true,
};

export function CourseForm({
  initialData,
  instructors,
  onSubmit,
  mode,
}: Props) {
  const router = useRouter();
  const [form, setForm] = useState<CourseFormData>({
    ...emptyForm,
    ...initialData,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [prereqInput, setPrereqInput] = useState('');

  const update = <K extends keyof CourseFormData>(
    key: K,
    value: CourseFormData[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const updatePrice = (
    key: 'in-person' | 'online' | 'hybrid',
    value: number
  ) => {
    setForm((prev) => ({
      ...prev,
      price: { ...prev.price, [key]: value },
    }));
  };

  const addTag = () => {
    if (tagInput.trim() && !form.tags.includes(tagInput.trim())) {
      update('tags', [...form.tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const addPrereq = () => {
    if (
      prereqInput.trim() &&
      !form.prerequisites.includes(prereqInput.trim())
    ) {
      update('prerequisites', [...form.prerequisites, prereqInput.trim()]);
      setPrereqInput('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.title.trim()) return setError('عنوان الزامی است');
    if (!form.slug.trim()) return setError('slug الزامی است');
    if (!form.instructorId) return setError('استاد را انتخاب کنید');
    if (!form.description.trim()) return setError('توضیحات الزامی است');

    setLoading(true);
    try {
      await onSubmit(form);
      router.push('/admin/courses');
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
              عنوان دوره *
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => update('title', e.target.value)}
              placeholder="مثلاً: دوره جامع پایتون"
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-blue-500 outline-none text-sm transition"
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
              placeholder="python-programming"
              dir="ltr"
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-blue-500 outline-none text-sm transition text-left"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              استاد *
            </label>
            <select
              value={form.instructorId}
              onChange={(e) => update('instructorId', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-blue-500 outline-none text-sm transition"
            >
              <option value="">انتخاب کنید...</option>
              {instructors.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.name}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              توضیح کوتاه
            </label>
            <input
              type="text"
              value={form.shortDescription}
              onChange={(e) => update('shortDescription', e.target.value)}
              placeholder="یک جمله کوتاه"
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-blue-500 outline-none text-sm transition"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              توضیحات کامل *
            </label>
            <textarea
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
              rows={4}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-blue-500 outline-none text-sm transition resize-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              آدرس تصویر
            </label>
            <input
              type="text"
              value={form.image}
              onChange={(e) => update('image', e.target.value)}
              placeholder="/images/courses/example.jpg"
              dir="ltr"
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-blue-500 outline-none text-sm transition text-left"
            />
          </div>
        </div>
      </div>

      {/* مشخصات */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
        <h2 className="font-bold text-gray-900 dark:text-white text-lg">
          مشخصات دوره
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              نوع برگزاری
            </label>
            <select
              value={form.mode}
              onChange={(e) => update('mode', e.target.value as any)}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none text-sm"
            >
              <option value="online">آنلاین</option>
              <option value="in-person">حضوری</option>
              <option value="hybrid">ترکیبی</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              سطح
            </label>
            <select
              value={form.level}
              onChange={(e) => update('level', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none text-sm"
            >
              <option value="beginner">مبتدی</option>
              <option value="intermediate">متوسط</option>
              <option value="advanced">پیشرفته</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              گواهی‌نامه
            </label>
            <select
              value={form.certificate ? 'yes' : 'no'}
              onChange={(e) => update('certificate', e.target.value === 'yes')}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none text-sm"
            >
              <option value="yes">دارد</option>
              <option value="no">ندارد</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              مدت (ساعت)
            </label>
            <input
              type="number"
              value={form.duration}
              onChange={(e) => update('duration', Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              تعداد جلسات
            </label>
            <input
              type="number"
              value={form.sessions}
              onChange={(e) => update('sessions', Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              ظرفیت کل
            </label>
            <input
              type="number"
              value={form.capacity}
              onChange={(e) => update('capacity', Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              ظرفیت باقی‌مانده
            </label>
            <input
              type="number"
              value={form.remainingCapacity}
              onChange={(e) =>
                update('remainingCapacity', Number(e.target.value))
              }
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              تاریخ شروع
            </label>
            <input
              type="text"
              value={form.startDate}
              onChange={(e) => update('startDate', e.target.value)}
              placeholder="۱۴۰۴/۰۸/۱۵"
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              برنامه هفتگی
            </label>
            <input
              type="text"
              value={form.schedule}
              onChange={(e) => update('schedule', e.target.value)}
              placeholder="شنبه و دوشنبه ۱۸:۰۰ - ۲۰:۰۰"
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none text-sm"
            />
          </div>
        </div>
      </div>

      {/* قیمت */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
        <h2 className="font-bold text-gray-900 dark:text-white text-lg">
          قیمت‌ها (تومان)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              حضوری
            </label>
            <input
              type="number"
              value={form.price['in-person'] || 0}
              onChange={(e) =>
                updatePrice('in-person', Number(e.target.value))
              }
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              آنلاین
            </label>
            <input
              type="number"
              value={form.price.online || 0}
              onChange={(e) => updatePrice('online', Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              ترکیبی
            </label>
            <input
              type="number"
              value={form.price.hybrid || 0}
              onChange={(e) => updatePrice('hybrid', Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none text-sm"
            />
          </div>
        </div>
      </div>

      {/* تگ‌ها و پیش‌نیازها */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-6">
        <div>
          <h2 className="font-bold text-gray-900 dark:text-white text-lg mb-4">
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
            {form.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm"
              >
                {tag}
                <button
                  type="button"
                  onClick={() =>
                    update(
                      'tags',
                      form.tags.filter((t) => t !== tag)
                    )
                  }
                  className="hover:text-red-500"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-bold text-gray-900 dark:text-white text-lg mb-4">
            پیش‌نیازها
          </h2>

          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={prereqInput}
              onChange={(e) => setPrereqInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === 'Enter' && (e.preventDefault(), addPrereq())
              }
              placeholder="مثلاً: آشنایی با کامپیوتر"
              className="flex-1 px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none text-sm"
            />
            <button
              type="button"
              onClick={addPrereq}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm transition"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2">
            {form.prerequisites.map((p) => (
              <div
                key={p}
                className="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 text-sm"
              >
                <span className="text-gray-700 dark:text-gray-300">{p}</span>
                <button
                  type="button"
                  onClick={() =>
                    update(
                      'prerequisites',
                      form.prerequisites.filter((x) => x !== p)
                    )
                  }
                  className="text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
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
              اگه غیرفعال باشه، دوره توی سایت نشون داده نمیشه
            </div>
          </div>
        </label>
      </div>

      {/* دکمه‌ها */}
      <div className="flex gap-3 justify-end">
        <button
          type="button"
          onClick={() => router.push('/admin/courses')}
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
              {mode === 'create' ? 'افزودن دوره' : 'ذخیره تغییرات'}
            </>
          )}
        </button>
      </div>
    </form>
  );
}