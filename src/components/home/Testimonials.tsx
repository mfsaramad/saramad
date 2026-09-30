'use client';

import { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { testimonials } from '@/lib/data';
import SectionTitle from '@/components/shared/SectionTitle';
import TestimonialCard from '@/components/shared/TestimonialCard';
import { cn } from '@/lib/utils';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  // تنظیم تعداد آیتم‌های نمایشی بر اساس عرض صفحه
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerView(1);
      else if (window.innerWidth < 1024) setItemsPerView(2);
      else setItemsPerView(3);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - itemsPerView);

  const next = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="نظرات دانشجویان"
          title="دانشجویان سرآمد چه می‌گویند؟"
          description="تجربه واقعی دانشجویان ما از یادگیری در سرآمد"
        />

        {/* اسلایدر */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(${currentIndex * (100 / itemsPerView)}%)`,
              }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>

          {/* دکمه‌های ناوبری */}
          <div className="flex items-center justify-center gap-3 mt-10">
            <button
              onClick={prev}
              disabled={currentIndex === 0}
              aria-label="قبلی"
              className={cn(
                'w-11 h-11 rounded-full flex items-center justify-center transition-all',
                currentIndex === 0
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-white text-brand-800 shadow-md hover:bg-brand-800 hover:text-white hover:shadow-lg'
              )}
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* نقطه‌ها */}
            <div className="flex items-center gap-2 px-4">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`اسلاید ${index + 1}`}
                  className={cn(
                    'rounded-full transition-all',
                    index === currentIndex
                      ? 'w-8 h-2.5 bg-brand-800'
                      : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400'
                  )}
                />
              ))}
            </div>

            <button
              onClick={next}
              disabled={currentIndex === maxIndex}
              aria-label="بعدی"
              className={cn(
                'w-11 h-11 rounded-full flex items-center justify-center transition-all',
                currentIndex === maxIndex
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-white text-brand-800 shadow-md hover:bg-brand-800 hover:text-white hover:shadow-lg'
              )}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}