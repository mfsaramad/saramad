import Hero from '@/components/home/Hero';
import SkillsCategories from '@/components/home/SkillsCategories';
import WhyUs from '@/components/home/WhyUs';
import LearningModes from '@/components/home/LearningModes';
import PopularCourses from '@/components/home/PopularCourses';
import LiveStats from '@/components/home/LiveStats';
import LiveClasses from '@/components/home/LiveClasses';
import OnlineExams from '@/components/home/OnlineExams';
import ShopSection from '@/components/home/ShopSection';
import Branches from '@/components/home/Branches';
import Instructors from '@/components/home/Instructors';
import StatsSection from '@/components/home/StatsSection';
import Testimonials from '@/components/home/Testimonials';
import BlogSection from '@/components/home/BlogSection';
import CTA from '@/components/home/CTA';

export default function HomePage() {
  return (
    <>
      {/* ۱. هیرو */}
      <Hero />

      {/* ۲. دسته‌بندی مهارت‌ها */}
      <SkillsCategories />

      {/* ۳. چرا سرآمد؟ - جدید */}
      <WhyUs />

      {/* ۴. نحوه یادگیری */}
      <LearningModes />

      {/* ۵. دوره‌های محبوب */}
      <PopularCourses />

      {/* ۶. آمار زنده - جدید */}
      <LiveStats />

      {/* ۷. کلاس‌های آنلاین زنده */}
      <LiveClasses />

      {/* ۸. آزمون‌های آنلاین */}
      <OnlineExams />

      {/* ۹. فروشگاه */}
      <ShopSection />

      {/* ۱۰. شعبه حضوری */}
      <Branches />

      {/* ۱۱. اساتید برتر */}
      <Instructors />

      {/* ۱۲. آمار و افتخارات */}
      <StatsSection />

      {/* ۱۳. نظرات دانشجویان */}
      <Testimonials />

      {/* ۱۴. وبلاگ */}
      <BlogSection />

      {/* ۱۵. دعوت به ثبت‌نام */}
      <CTA />
    </>
  );
}