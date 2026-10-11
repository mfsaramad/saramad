'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Save,
  X,
  Loader2,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export interface ExamQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface ExamFormData {
  id?: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  type: 'level' | 'mock' | 'free';
  typeLabel: string;
  icon: string;
  color: 'brand' | 'teal' | 'accent';
  questions: number;
  duration: number;
  level: string;
  price: number;
  participants: number;
  rating: number;
  reviewsCount: number;
  successRate: number;
  certificate: boolean;
  tags: string[];
  examData: {
    id: string;
    title: string;
    description: string;
    duration: number;
    level: string;
    icon: string;
    questions: ExamQuestion[];
  };
  isActive: boolean;
}

interface Props {
  initialData?: Partial<ExamFormData>;
  onSubmit: (data: ExamFormData) => Promise<void> | void;
  mode: 'create' | 'edit';
}

const emptyForm: ExamFormData = {
  slug: '',
  title: '',
  description: '',
  longDescription: '',
  type: 'level',
  typeLabel: 'تعیین سطح',
  icon: '📝',
  color: 'brand',
  questions: 0,
  duration: 30,
  level: 'مقدماتی',
  price: 0,
  participants: 0,
  rating: 5,
  reviewsCount: 0,
  successRate: 80,
  certificate: false,
  tags: [],
  examData: {
    id: '',
    title: '',
    description: '',
    duration: 30,
    level: 'مقدماتی',
    icon: '📝',
    questions: [],
  },
  isActive: true,
};

const TYPE_OPTIONS = [
  { value: 'level', label: 'تعیین سطح' },
  { value: 'mock', label: 'آزمایشی' },
  { value: 'free', label: 'رایگان' },
];

export function ExamForm({ initialData, onSubmit, mode }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<ExamFormData>({
    ...emptyForm,
    ...initialData,
    examData: {
      ...emptyForm.examData,
      ...(initialData?.examData || {}),
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);

  const update = <K extends keyof ExamFormData>(
    key: K,
    value: ExamFormData[K]
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

  const addQuestion = () => {
    const newId =
      form.examData.questions.length > 0
        ? Math.max(...form.examData.questions.map((q) => q.id)) + 1
        : 1;

    const newQuestion: ExamQuestion = {
      id: newId,
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
    };

    update('examData', {
      ...form.examData,
      questions: [...form.examData.questions, newQuestion],
    });

    setExpandedQuestion(newId);
  };

  const updateQuestion = (id: number, updates: Partial<ExamQuestion>) => {
    update('examData', {
      ...form.examData,
      questions: form.examData.questions.map((q) =>
        q.id === id ? { ...q, ...updates } : q
      ),
    });
  };

  const removeQuestion = (id: number) => {
    update('examData', {
      ...form.examData,
      questions: form.examData.questions.filter((q) => q.id !== id),
    });
  };

  const updateOption = (
    questionId: number,
    optionIndex: number,
    value: string
  ) => {
    const q = form.examData.questions.find((x) => x.id === questionId);
    if (!q) return;

    const newOptions = [...q.options];
    newOptions[optionIndex] = value;
    updateQuestion(questionId, { options: newOptions });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.title.trim()) return setError('عنوان الزامی است');
    if (!form.slug.trim()) return setError('slug الزامی است');
    if (!form.description.trim()) return setError('توضیحات الزامی است');

    const finalForm = {
      ...form,
      questions: form.examData.questions.length,
      examData: {
        ...form.examData,
        id: form.id || '',
        title: form.title,
        description: form.description,
        duration: form.duration,
        level: form.level,
        icon: form.icon,
      },
    };

    setLoading(true);
    try {
      await onSubmit(finalForm);
      window.location.href = '/admin/exams';
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
              عنوان آزمون *
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => update('title', e.target.value)}
              placeholder="مثلاً: آزمون تعیین سطح برنامه‌نویسی"
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
              placeholder="programming-level-test"
              dir="ltr"
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-blue-500 outline-none text-sm text-left"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              نوع آزمون
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
              rows={3}
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
              placeholder="📝"
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              سطح
            </label>
            <input
              type="text"
              value={form.level}
              onChange={(e) => update('level', e.target.value)}
              placeholder="مقدماتی تا پیشرفته"
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none text-sm"
            />
          </div>
        </div>
      </div>

      {/* مشخصات */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
        <h2 className="font-bold text-gray-900 dark:text-white text-lg">
          مشخصات آزمون
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              مدت زمان (دقیقه)
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
              گواهی‌نامه
            </label>
            <select
              value={form.certificate ? 'yes' : 'no'}
              onChange={(e) => update('certificate', e.target.value === 'yes')}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none text-sm"
            >
              <option value="no">ندارد</option>
              <option value="yes">دارد</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              شرکت‌کنندگان
            </label>
            <input
              type="number"
              value={form.participants}
              onChange={(e) => update('participants', Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              امتیاز
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
              نرخ موفقیت (٪)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={form.successRate}
              onChange={(e) => update('successRate', Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none text-sm"
            />
          </div>
        </div>
      </div>

      {/* سوالات */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-gray-900 dark:text-white text-lg">
            سوالات ({form.examData.questions.length})
          </h2>
          <button
            type="button"
            onClick={addQuestion}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm transition"
          >
            <Plus className="w-4 h-4" />
            افزودن سوال
          </button>
        </div>

        {form.examData.questions.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
            هنوز سوالی اضافه نشده
          </div>
        ) : (
          <div className="space-y-3">
            {form.examData.questions.map((q, index) => {
              const isExpanded = expandedQuestion === q.id;

              return (
                <div
                  key={q.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden"
                >
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedQuestion(isExpanded ? null : q.id)
                      }
                      className="flex items-center gap-3 flex-1 text-right"
                    >
                      <span className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-bold flex items-center justify-center">
                        {index + 1}
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {q.question || 'سوال بدون عنوان'}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => removeQuestion(q.id)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 ml-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="p-4 space-y-4 bg-white dark:bg-gray-900">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                          متن سوال
                        </label>
                        <textarea
                          value={q.question}
                          onChange={(e) =>
                            updateQuestion(q.id, { question: e.target.value })
                          }
                          rows={2}
                          placeholder="متن سوال..."
                          className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none text-sm resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          گزینه‌ها (روی گزینه صحیح کلیک کن)
                        </label>
                        <div className="space-y-2">
                          {q.options.map((opt, optIdx) => (
                            <div key={optIdx} className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuestion(q.id, {
                                    correctAnswer: optIdx,
                                  })
                                }
                                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-bold transition ${
                                  q.correctAnswer === optIdx
                                    ? 'bg-green-500 text-white'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700'
                                }`}
                              >
                                {['الف', 'ب', 'ج', 'د'][optIdx] || optIdx + 1}
                              </button>
                              <input
                                type="text"
                                value={opt}
                                onChange={(e) =>
                                  updateOption(q.id, optIdx, e.target.value)
                                }
                                placeholder={`گزینه ${optIdx + 1}`}
                                className="flex-1 px-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none text-sm"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
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
            placeholder="مثلاً: برنامه‌نویسی"
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
              اگه غیرفعال باشه، آزمون توی سایت نشون داده نمیشه
            </div>
          </div>
        </label>
      </div>

      {/* دکمه‌ها */}
      <div className="flex gap-3 justify-end">
        <button
          type="button"
          onClick={() => router.push('/admin/exams')}
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
              {mode === 'create' ? 'افزودن آزمون' : 'ذخیره تغییرات'}
            </>
          )}
        </button>
      </div>
    </form>
  );
}