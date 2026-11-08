'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft, Star, Users, Clock, Calendar, Award, CheckCircle2,
  BookOpen, GraduationCap, PlayCircle, ShoppingCart, Heart,
  Share2, Check, AlertCircle, Sparkles, BarChart3, Zap,
  Trophy, ChevronDown, Layers, Video, Loader2,
} from 'lucide-react';
import {
  toPersianNumber, formatPrice, getModeLabel, getModeIcon, getLevelLabel,
} from '@/lib/format';
import CourseCard from '@/components/shared/CourseCard';
import FadeIn from '@/components/animations/FadeIn';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';

export default function CourseDetailClient() {
  const params = useParams();
  const slug = typeof params.slug === 'string' ? params.slug : '';

  const [course, setCourse] = useState<any>(null);
  const [relatedCourses, setRelatedCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('courses')
          .select(`
            *,
            users:instructor_id (name, avatar)
          `)
          .eq('slug', slug)
          .eq('is_active', true)
          .single();

        if (fetchError || !data) {
          console.error('خطا در دریافت دوره:', fetchError);
          setError(true);
          return;
        }

        setCourse({
          ...data,
          instructor: { name: data.users?.name || 'استاد' },
          studentsCount: data.students_count || 0,
          shortDescription: data.short_description || '',
          remainingCapacity: data.remaining_capacity || 0,
          certificate: data.certificate || false,
        });

        // دریافت دوره‌های مرتبط
        const { data: related } = await supabase
          .from('courses')
          .select('*, users:instructor_id (name)')
          .eq('is_active', true)
          .neq('id', data.id)
          .limit(3);

        if (related) {
          setRelatedCourses(related.map((c: any) => ({
            ...c,
            instructor: { name: c.users?.name || 'استاد' },
            studentsCount: c.students_count || 0,
            shortDescription: c.short_description || '',
          })));
        }
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) fetchCourse();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-6" dir="rtl">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h1 className="text-2xl font-black text-slate-800 mb-2">دوره یافت نشد</h1>
        <p className="text-slate-500 mb-6">متأسفانه دوره‌ای با این آدرس پیدا نشد.</p>
        <Link href="/courses" className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold">
          بازگشت به لیست دوره‌ها
        </Link>
      </div>
    );
  }

  // محاسبه قیمت
  let price = 0;
  if (typeof course.price === 'number') {
    price = course.price;
  } else if (typeof course.price === 'object' && course.price !== null) {
    const values = Object.values(course.price).filter((v): v is number => typeof v === 'number' && v > 0);
    price = values.length > 0 ? Math.min(...values) : 0;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950" dir="rtl">
      {/* هدر دوره */}
      <div className="relative pt-24 pb-12 bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#0d9488]">
        <div className="max-w-6xl mx-auto px-4">
          <Link href="/courses" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition">
            <ArrowLeft className="w-5 h-5" /> بازگشت به لیست دوره‌ها
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur rounded-full text-white text-xs font-bold mb-4">
                <Sparkles className="w-3.5 h-3.5" /> {getModeLabel(course.mode)}
              </div>
              <h1 className="text-3xl lg:text-4xl font-black text-white mb-4 leading-tight">
                {course.title}
              </h1>
              <p className="text-lg text-blue-100 mb-6 leading-relaxed">
                {course.description || course.shortDescription || 'توضیحات این دوره به زودی...'}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-white">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
                    {course.instructor?.name?.charAt(0) || 'م'}
                  </div>
                  <div>
                    <p className="text-xs text-blue-200">مدرس</p>
                    <p className="font-bold">{course.instructor?.name || 'استاد'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-bold">{course.rating || '۵'} / ۵</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{toPersianNumber(course.studentsCount || 0)} دانشجو</span>
                </div>
              </div>
            </div>

            {/* کارت خرید */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl p-6 shadow-2xl">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-teal-100 rounded-2xl mb-6 flex items-center justify-center">
                  <PlayCircle className="w-16 h-16 text-blue-600/50" />
                </div>
                <div className="text-center mb-6">
                  <p className="text-sm text-slate-500 mb-1">قیمت دوره</p>
                  <p className="text-3xl font-black text-blue-700">{formatPrice(price)}</p>
                </div>
                <button className="w-full py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 mb-3 transition">
                  <ShoppingCart className="w-5 h-5" /> افزودن به سبد خرید
                </button>
                <button className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl flex items-center justify-center gap-2 transition">
                  <Heart className="w-5 h-5" /> افزودن به علاقه‌مندی‌ها
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* محتوای دوره */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl p-6 border border-slate-200">
              <h2 className="text-xl font-black text-slate-800 mb-4">درباره این دوره</h2>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                {course.description || course.shortDescription || 'توضیحات این دوره به زودی اضافه خواهد شد.'}
              </p>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200">
              <h3 className="text-lg font-black text-slate-800 mb-4">مشخصات دوره</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 flex items-center gap-2"><Clock className="w-4 h-4" /> مدت زمان</span>
                  <span className="font-bold">{toPersianNumber(course.duration || 0)} ساعت</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 flex items-center gap-2"><Layers className="w-4 h-4" /> تعداد جلسات</span>
                  <span className="font-bold">{toPersianNumber(course.sessions || 0)} جلسه</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 flex items-center gap-2"><BarChart3 className="w-4 h-4" /> سطح دوره</span>
                  <span className="font-bold">{getLevelLabel(course.level) || 'مقدماتی'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 flex items-center gap-2"><Video className="w-4 h-4" /> نوع برگزاری</span>
                  <span className="font-bold">{getModeLabel(course.mode)}</span>
                </div>
                {course.certificate && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center gap-2"><Award className="w-4 h-4" /> گواهی‌نامه</span>
                    <span className="font-bold text-green-600">دارد</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* دوره‌های مرتبط */}
        {relatedCourses.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-black text-slate-800 mb-6">دوره‌های مرتبط</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedCourses.map(c => (
                <CourseCard key={c.id} course={c} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}