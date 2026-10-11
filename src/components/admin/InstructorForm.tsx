'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X, Loader2, Plus } from 'lucide-react';

export interface InstructorFormData {
  id?: string;
  name: string;
  title: string;
  bio: string;
  avatar: string;
  specialties: string[];
  coursesCount: number;
  studentsCount: number;
  rating: number;
  isActive: boolean;
}

interface Props {
  initialData?: Partial<InstructorFormData>;
  onSubmit: (data: InstructorFormData) => Promise<void> | void;
  mode: 'create' | 'edit';
}

const emptyForm: InstructorFormData = {
  name: '',
  title: '',
  bio: '',
  avatar: '/images/instructors/default.jpg',
  specialties: [],
  coursesCount: 0,
  studentsCount: 0,
  rating: 5,
  isActive: true,
};

export function InstructorForm({ initialData, onSubmit, mode }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<InstructorFormData>({
    ...emptyForm,
    ...initialData,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [specialtyInput, setSpecialtyInput] = useState('');

  const update = <K extends keyof InstructorFormData>(
    key: K,
    value: InstructorFormData[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const addSpecialty = () => {
    if (
      specialtyInput.trim() &&
      !form.specialties.includes(specialtyInput.trim())
    ) {
      update('specialties', [...form.specialties, specialtyInput.trim()]);
      setSpecialtyInput('');
    }
  };

  const removeSpecialty = (s: string) => {
    update(
      'specialties',
      form.specialties.filter((x) => x !== s)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.name.trim()) return setError('نام الزامی است');
    if (!form.title.trim()) return setError('عنوان الزامی است');
    if (!form.bio.trim()) return setError('بیوگرافی الزامی است');

    setLoading(true);
    try {
      await onSubmit(form);
      window.location.href = '/admin/instructors';
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
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              نام کامل *
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              placeholder="مثلاً: دکتر علی محمدی"
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-blue-500 outline-none text-sm transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              عنوان تخصص *
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => update('title', e.target.value)}
              placeholder="مثلاً: متخصص برنامه‌نویسی و هوش مصنوعی"
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-blue-500 outline-none text-sm transition"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              بیوگرافی *
            </label>
            <textarea
              value={form.bio}
              onChange={(e) => update('bio', e.target.value)}
              rows={4}
              placeholder="توضیح کوتاه درباره سابقه و تخصص"
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-blue-500 outline-none text-sm transition resize-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              آدرس تصویر
            </label>
            <input
              type="text"
              value={form.avatar}
              onChange={(e) => update('avatar', e.target.value)}
              placeholder="/images/instructors/example.jpg"
              dir="ltr"
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-blue-500 outline-none text-sm transition text-left"
            />
          </div>
        </div>
      </div>

      {/* آمار */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
        <h2 className="font-bold text-gray-900 dark:text-white text-lg">
          آمار
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              تعداد دوره‌ها
            </label>
            <input
              type="number"
              value={form.coursesCount}
              onChange={(e) => update('coursesCount', Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              تعداد دانشجو
            </label>
            <input
              type="number"
              value={form.studentsCount}
              onChange={(e) => update('studentsCount', Number(e.target.value))}
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
        </div>
      </div>

      {/* تخصص‌ها */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
        <h2 className="font-bold text-gray-900 dark:text-white text-lg">
          تخصص‌ها
        </h2>

        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={specialtyInput}
            onChange={(e) => setSpecialtyInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === 'Enter' && (e.preventDefault(), addSpecialty())
            }
            placeholder="مثلاً: Python"
            className="flex-1 px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none text-sm"
          />
          <button
            type="button"
            onClick={addSpecialty}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm transition"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {form.specialties.map((s) => (
            <span
              key={s}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm"
            >
              {s}
              <button
                type="button"
                onClick={() => removeSpecialty(s)}
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
              اگه غیرفعال باشه، استاد توی سایت نشون داده نمیشه
            </div>
          </div>
        </label>
      </div>

      {/* دکمه‌ها */}
      <div className="flex gap-3 justify-end">
        <button
          type="button"
          onClick={() => router.push('/admin/instructors')}
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
              {mode === 'create' ? 'افزودن استاد' : 'ذخیره تغییرات'}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
