import Link from 'next/link';
import {
  Shield,
  Lock,
  Eye,
  Database,
  Cookie,
  UserCheck,
  Share2,
  Trash2,
  Mail,
  Phone,
  CheckCircle2,
} from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import FadeIn from '@/components/animations/FadeIn';
import { cn } from '@/lib/utils';

const sections = [
  {
    id: 1,
    title: 'اطلاعاتی که جمع‌آوری می‌کنیم',
    icon: Database,
    color: 'brand' as const,
    content: [
      'اطلاعات شخصی: نام، نام خانوادگی، ایمیل، شماره تماس، کد ملی',
      'اطلاعات حساب: نام کاربری، رمز عبور (به‌صورت رمزنگاری‌شده)',
      'اطلاعات پرداخت: تاریخ تراکنش‌ها و مبالغ (اطلاعات کارت بانکی ذخیره نمی‌شود)',
      'اطلاعات فنی: آدرس IP، نوع مرورگر، سیستم‌عامل، زمان بازدید',
      'اطلاعات استفاده: دوره‌های خریداری‌شده، پیشرفت در دوره‌ها، نتایج آزمون‌ها',
    ],
  },
  {
    id: 2,
    title: 'چگونه از اطلاعات استفاده می‌کنیم',
    icon: Eye,
    color: 'teal' as const,
    content: [
      'ارائه خدمات آموزشی و مدیریت دوره‌ها',
      'پردازش تراکنش‌ها و صدور فاکتور',
      'ارسال اطلاع‌رسانی‌های مرتبط با دوره‌ها',
      'بهبود کیفیت خدمات و تجربه کاربری',
      'پاسخگویی به درخواست‌های پشتیبانی',
      'رعایت الزامات قانونی و مالیاتی',
    ],
  },
  {
    id: 3,
    title: 'امنیت اطلاعات',
    icon: Lock,
    color: 'accent' as const,
    content: [
      'تمام ارتباطات با سرآمد از طریق پروتکل امن HTTPS انجام می‌شود',
      'رمز عبور کاربران به‌صورت رمزنگاری‌شده (Hash) ذخیره می‌شود',
      'اطلاعات بانکی کاربران در سایت سرآمد ذخیره نمی‌شود',
      'دسترسی به اطلاعات کاربران محدود به کارکنان مجاز است',
      'سرورهای سرآمد در برابر حملات امنیتی محافظت می‌شوند',
    ],
  },
  {
    id: 4,
    title: 'اشتراک‌گذاری اطلاعات',
    icon: Share2,
    color: 'brand' as const,
    content: [
      'اطلاعات کاربران با هیچ شخص سوم تجاری به اشتراک گذاشته نمی‌شود',
      'در صورت الزام قانونی، اطلاعات با مراجع قضایی به اشتراک گذاشته می‌شود',
      'اطلاعات تجمیعی (بدون هویت شخصی) ممکن است برای آمار منتشر شود',
      'در صورت انتقال کسب‌وکار، کاربران مطلع خواهند شد',
    ],
  },
  {
    id: 5,
    title: 'کوکی‌ها',
    icon: Cookie,
    color: 'teal' as const,
    content: [
      'سرآمد از کوکی‌ها برای بهبود تجربه کاربری استفاده می‌کند',
      'کوکی‌های ضروری: برای ورود، امنیت و عملکرد سایت',
      'کوکی‌های تحلیلی: برای بررسی نحوه استفاده از سایت',
      'شما می‌توانید کوکی‌ها را از تنظیمات مرورگر خود مسدود کنید',
    ],
  },
  {
    id: 6,
    title: 'حقوق شما',
    icon: UserCheck,
    color: 'accent' as const,
    content: [
      'دسترسی به اطلاعات شخصی خود و دریافت نسخه‌ای از آن',
      'ویرایش یا به‌روزرسانی اطلاعات شخصی',
      'درخواست حذف حساب کاربری و اطلاعات مرتبط',
      'لغو اشتراک خبرنامه‌ها و اطلاع‌رسانی‌ها',
      'شکایت به مراجع نظارتی در صورت نقض حریم خصوصی',
    ],
  },
  {
    id: 7,
    title: 'حذف اطلاعات',
    icon: Trash2,
    color: 'brand' as const,
    content: [
      'کاربران می‌توانند درخواست حذف حساب خود را ارسال کنند',
      'پس از تأیید، اطلاعات شخصی ظرف ۳۰ روز حذف می‌شود',
      'برخی اطلاعات ممکن است به دلایل قانونی نگهداری شود',
      'پس از حذف، امکان بازیابی حساب وجود ندارد',
    ],
  },
];

export default function PrivacyPage() {
  const colorMap = {
    brand: {
      bg: 'bg-blue-100 dark:bg-blue-950/50',
      icon: 'text-blue-800 dark:text-blue-300',
    },
    teal: {
      bg: 'bg-teal-100 dark:bg-teal-950/50',
      icon: 'text-teal-600 dark:text-teal-300',
    },
    accent: {
      bg: 'bg-orange-100 dark:bg-orange-950/50',
      icon: 'text-orange-600 dark:text-orange-300',
    },
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
      {/* ===== Hero ===== */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#0d9488] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur border border-white/20 rounded-full text-white text-sm font-bold mb-5">
              <Shield className="w-4 h-4 text-orange-300" />
              <span>حریم خصوصی</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-black text-white mb-4">
              سیاست حریم خصوصی
            </h1>

            <p className="text-lg text-blue-100 leading-relaxed max-w-2xl mx-auto">
              امنیت و حریم خصوصی شما برای سرآمد اهمیت بالایی دارد
            </p>

            <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur border border-white/20 rounded-full text-xs font-bold text-white">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>آخرین بروزرسانی: ۱۴۰۴/۰۷/۱۵</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== محتوا ===== */}
      <section className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* فهرست */}
          <FadeIn>
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 mb-8">
              <h2 className="text-lg font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-brand-800 dark:text-brand-300" />
                فهرست مطالب
              </h2>
              <div className="grid sm:grid-cols-2 gap-2">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#privacy-${section.id}`}
                    className="flex items-center gap-2 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition group"
                  >
                    <span className="w-6 h-6 rounded-lg bg-brand-100 dark:bg-brand-950/50 flex items-center justify-center text-xs font-black text-brand-800 dark:text-brand-300">
                      {section.id}
                    </span>
                    <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-brand-800 dark:group-hover:text-brand-300 transition">
                      {section.title}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* تعهد */}
          <FadeIn delay={0.1}>
            <div className="mb-8 p-5 bg-teal-50 dark:bg-teal-950/20 border-r-4 border-teal-500 rounded-2xl">
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-teal-600 dark:text-teal-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-black text-teal-900 dark:text-teal-300 mb-2">
                    تعهد ما
                  </h3>
                  <p className="text-sm text-teal-800 dark:text-teal-400 leading-relaxed">
                    سرآمد متعهد است اطلاعات شخصی شما را محرمانه نگه دارد و از
                    آن‌ها تنها برای ارائه خدمات آموزشی استفاده کند. ما هرگز
                    اطلاعات شما را به شخص سوم نمی‌فروشیم.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* بخش‌ها */}
          <div className="space-y-6">
            {sections.map((section, index) => {
              const Icon = section.icon;
              const colors = colorMap[section.color];

              return (
                <FadeIn key={section.id} delay={index * 0.05} direction="up">
                  <div
                    id={`privacy-${section.id}`}
                    className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 lg:p-8 scroll-mt-24"
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <div
                        className={cn(
                          'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0',
                          colors.bg
                        )}
                      >
                        <Icon className={cn('w-6 h-6', colors.icon)} />
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-black text-slate-300 dark:text-slate-700">
                          {section.id}
                        </span>
                        <h2 className="text-xl font-black text-slate-800 dark:text-slate-100">
                          {section.title}
                        </h2>
                      </div>
                    </div>

                    <ul className="space-y-3">
                      {section.content.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-slate-600 dark:text-slate-400 leading-relaxed"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0 mt-2.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              );
            })}
          </div>

          {/* تماس */}
          <FadeIn delay={0.3}>
            <div className="mt-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 lg:p-10 text-center text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />

              <div className="relative">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center mb-5">
                  <Lock className="w-8 h-8 text-teal-400" />
                </div>

                <h2 className="text-2xl lg:text-3xl font-black mb-3">
                  سوالی درباره حریم خصوصی داری؟
                </h2>
                <p className="text-blue-100 max-w-lg mx-auto mb-8">
                  کارشناسان ما آماده پاسخگویی به سوالات شما هستند
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-orange-500 hover:bg-orange-600 rounded-xl font-black shadow-xl shadow-orange-500/30 hover:scale-105 transition-all"
                  >
                    <Mail className="w-5 h-5" />
                    ارسال ایمیل
                  </a>
                  <a
                    href={`tel:${SITE_CONFIG.phone}`}
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 rounded-xl font-bold transition"
                  >
                    <Phone className="w-5 h-5" />
                    تماس تلفنی
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}