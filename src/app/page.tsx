import Hero from '@/components/home/Hero';
import SkillsCategories from '@/components/home/SkillsCategories';
import LearningModes from '@/components/home/LearningModes';
import PopularCourses from '@/components/home/PopularCourses';
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
      <Hero />
      <SkillsCategories />
      <LearningModes />
      <PopularCourses />
      <LiveClasses />
      <OnlineExams />
      <ShopSection />
      <Branches />
      <Instructors />
      <StatsSection />
      <Testimonials />
      <BlogSection />
      <CTA />
    </>
  );
}