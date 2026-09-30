import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { instructors } from '@/lib/data';
import SectionTitle from '@/components/shared/SectionTitle';
import InstructorCard from '@/components/shared/InstructorCard';

export default function Instructors() {
  const topInstructors = instructors.slice(0, 4);

  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="اساتید برتر"
          title="با بهترین اساتید یاد بگیر"
          description="اساتید مجرب و حرفه‌ای سرآمد، شما را در مسیر یادگیری همراهی می‌کنند"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topInstructors.map((instructor) => (
            <InstructorCard key={instructor.id} instructor={instructor} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/instructors"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-brand-800 text-brand-800 font-bold hover:bg-brand-800 hover:text-white transition"
          >
            مشاهده همه اساتید
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}