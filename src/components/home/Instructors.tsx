import Link from 'next/link';
import { ArrowLeft, Users } from 'lucide-react';
import { instructors } from '@/lib/data';
import SectionTitle from '@/components/shared/SectionTitle';
import InstructorCard from '@/components/shared/InstructorCard';
import FadeIn from '@/components/animations/FadeIn';

export default function Instructors() {
  const topInstructors = instructors.slice(0, 4);

  return (
    <section className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      {/* الگوی تزئینی */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            'radial-gradient(circle, currentColor 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="اساتید برتر"
          title="با بهترین اساتید یاد بگیر"
          description="اساتید مجرب و حرفه‌ای سرآمد، شما را در مسیر یادگیری همراهی می‌کنند"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topInstructors.map((instructor, index) => (
            <FadeIn
              key={instructor.id}
              delay={index * 0.1}
              direction="up"
              className="h-full"
            >
              <InstructorCard instructor={instructor} />
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.5}>
          <div className="text-center mt-12">
            <Link
              href="/instructors"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-brand-800 dark:border-brand-300 text-brand-800 dark:text-brand-300 font-bold hover:bg-brand-800 dark:hover:bg-brand-300 hover:text-white dark:hover:text-brand-800 transition-all hover:gap-3 group"
            >
              <Users className="w-4 h-4" />
              مشاهده همه اساتید
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}