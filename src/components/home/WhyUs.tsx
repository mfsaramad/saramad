import {
  Award,
  Users,
  BookOpen,
  Zap,
  Shield,
  Heart,
} from 'lucide-react';
import SectionTitle from '@/components/shared/SectionTitle';
import FadeIn from '@/components/animations/FadeIn';

const features = [
  {
    icon: Award,
    title: 'مدرک معتبر',
    description: 'مدرک رسمی فنی و حرفه‌ای پس از اتمام دوره',
    color: 'brand' as const,
  },
  {
    icon: Users,
    title: 'اساتید مجرب',
    description: 'اساتید با سال‌ها تجربه در صنعت و تدریس',
    color: 'teal' as const,
  },
  {
    icon: BookOpen,
    title: 'منابع به‌روز',
    description: 'محتوای آموزشی مطابق با بازار کار روز',
    color: 'accent' as const,
  },
  {
    icon: Zap,
    title: 'یادگیری سریع',
    description: 'روش‌های نوین آموزشی برای یادگیری سریع‌تر',
    color: 'purple' as const,
  },
  {
    icon: Shield,
    title: 'پشتیبانی قوی',
    description: 'تیم پشتیبانی ۲۴/۷ در تمام مراحل',
    color: 'brand' as const,
  },
  {
    icon: Heart,
    title: 'محیط صمیمی',
    description: 'فضایی دوستانه و انگیزه‌بخش برای یادگیری',
    color: 'teal' as const,
  },
];

const colorMap = {
  brand: {
    bg: 'bg-blue-100 dark:bg-blue-950/50',
    icon: 'text-blue-800 dark:text-blue-300',
    hoverBg: 'group-hover:bg-blue-800',
    hoverIcon: 'group-hover:text-white',
    border: 'hover:border-blue-800',
  },
  teal: {
    bg: 'bg-teal-100 dark:bg-teal-950/50',
    icon: 'text-teal-600 dark:text-teal-300',
    hoverBg: 'group-hover:bg-teal-500',
    hoverIcon: 'group-hover:text-white',
    border: 'hover:border-teal-500',
  },
  accent: {
    bg: 'bg-orange-100 dark:bg-orange-950/50',
    icon: 'text-orange-600 dark:text-orange-300',
    hoverBg: 'group-hover:bg-orange-500',
    hoverIcon: 'group-hover:text-white',
    border: 'hover:border-orange-500',
  },
  purple: {
    bg: 'bg-purple-100 dark:bg-purple-950/50',
    icon: 'text-purple-600 dark:text-purple-300',
    hoverBg: 'group-hover:bg-purple-600',
    hoverIcon: 'group-hover:text-white',
    border: 'hover:border-purple-600',
  },
};

export default function WhyUs() {
  return (
    <section className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="چرا سرآمد؟"
          title="چه چیزی ما را متمایز می‌کند؟"
          description="با انتخاب سرآمد، مسیر حرفه‌ای شدن خود را با اطمینان طی کنید"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const colors = colorMap[feature.color];

            return (
              <FadeIn key={index} delay={index * 0.1} direction="up">
                <div
                  className={`group bg-white dark:bg-slate-900 rounded-3xl p-6 border-2 border-slate-100 dark:border-slate-800 ${colors.border} hover:shadow-2xl hover:-translate-y-2 transition-all duration-300`}
                >
                  <div
                    className={`w-16 h-16 rounded-2xl ${colors.bg} ${colors.hoverBg} flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110`}
                  >
                    <Icon
                      className={`w-8 h-8 ${colors.icon} ${colors.hoverIcon} transition-colors duration-300`}
                    />
                  </div>

                  <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 mb-2">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}