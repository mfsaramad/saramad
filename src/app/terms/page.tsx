import Link from 'next/link';
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  ScrollText,
  Shield,
  Users,
  CreditCard,
  Copyright,
  Scale,
  XCircle,
} from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import FadeIn from '@/components/animations/FadeIn';
import { cn } from '@/lib/utils';

const sections = [
  {
    id: 1,
    title: 'پذیرش قوانین',
    icon: CheckCircle2,
    color: 'teal' as const,
    content: [
      'با ثبت‌نام در دوره‌های آموزشگاه سرآمد، شما تمام قوانین و مقررات این صفحه را می‌پذیرید.',
      'استفاده از خدمات سرآمد به معنای موافقت کامل با این شرایط است.',
      'سرآمد حق تغییر قوانین را با اطلاع‌رسانی قبلی محفوظ می‌دارد.',
    ],
  },
  {
    id: 2,
    title: 'ثبت‌نام و پرداخت',
    icon: CreditCard,
    color: 'brand' as const,
    content: [
      'ثبت‌نام تنها پس از پرداخت کامل شهریه یا پرداخت قسط اول معتبر است.',
      'در دوره‌های اقساطی، عدم پرداخت اقساط به موقع منجر به قطع دسترسی می‌شود.',
      'قیمت‌ها به تومان و شامل مالیات بر ارزش افزوده است.',
      'امکان پرداخت اقساطی برای دوره‌های بالای ۳ میلیون تومان فراهم است.',
    ],
  },
  {
    id: 3,
    title: 'بازگشت وجه',
    icon: XCircle,
    color: 'accent' as const,
    content: [
      'تا ۷ روز پس از شروع دوره، در صورت عدم رضایت، وجه پرداختی به‌طور کامل بازگردانده می‌شود.',
      'پس از ۷ روز، امکان بازگشت وجه وجود ندارد.',
      'در صورت انصراف قبل از شروع دوره، ۱۰٪ از مبلغ کسر می‌شود.',
      'بازگشت وجه به حساب پرداخت‌کننده انجام می‌شود و بین ۳ تا ۷ روز کاری زمان می‌برد.',
    ],
  },
  {
    id: 4,
    title: 'حقوق مالکیت معنوی',
    icon: Copyright,
    color: 'brand' as const,
    content: [
      'تمام محتوای آموزشی سرآمد (ویدیو، جزوه، سوالات) متعلق به این آموزشگاه است.',
      'ضبط، تکثیر، انتشار یا فروش محتوا بدون اجازه کتبی سرآمد پیگرد قانونی دارد.',
      'استفاده شخصی از محتوا مجاز است، اما استفاده تجاری ممنوع است.',
      'نقض این قوانین منجر به مسدود شدن حساب کاربری می‌شود.',
    ],
  },
  {
    id: 5,
    title: 'رفتار کاربران',
    icon: Users,
    color: 'teal' as const,
    content: [
      'کاربران موظف به رعایت احترام با اساتید و سایر دانشجویان هستند.',
      'ارسال محتوای غیرقانونی، توهین‌آمیز یا نامناسب در کلاس‌ها ممنوع است.',
      'تبادل اطلاعات شخصی سایر کاربران بدون اجازه آن‌ها ممنوع است.',
      'سرآمد حق مسدود کردن حساب کاربران متخلف را محفوظ می‌دارد.',
    ],
  },
  {
    id: 6,
    title: 'حریم خصوصی',
    icon: Shield,
    color: 'accent' as const,
    content: [
      'اطلاعات شخصی کاربران نزد سرآمد محفوظ است و در اختیار شخص سوم قرار نمی‌گیرد.',
      'اطلاعات بانکی کاربران در سایت سرآمد ذخیره نمی‌شود.',
      'کاربران حق دارند اطلاعات خود را ویرایش یا حذف کنند.',
      'برای اطلاعات بیشتر به صفحه حریم خصوصی مراجعه کنید.',
    ],
  },
  {
    id: 7,
    title: 'مسئولیت‌ها',
    icon: Scale,
    color: 'brand' as const,
    content: [
      'سرآمد مسئول کیفیت آموزش است، اما مسئول نتیجه نهایی کاربران (مانند استخدام) نیست.',
      'کاربران مسئول صحت اطلاعات وارد شده هستند.',
      'سرآمد در قبال قطعی اینترنت یا مشکلات فنی خارج از کنترل، مسئولیتی ندارد.',
      'در صورت بروز مشکل فنی، سرآمد جبران مناسب را انجام می‌دهد.',
    ],
  },
];

export default function TermsPage() {
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
              <ScrollText className="w-4 h-4 text-orange-300" />
              <span>قوانین و مقررات</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-black text-white mb-4">
              قوانین و مقررات سرآمد
            </h1>

            <p className="text-lg text-blue-100 leading-relaxed">
              لطفاً قبل از ثبت‌نام، قوانین زیر را با دقت مطالعه کنید
            </p>

            <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur border border-white/20 rounded-full text-xs font-bold text-white">
              <FileText className="w-3.5 h-3.5" />
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
                <FileText className="w-5 h-5 text-brand-800 dark:text-brand-300" />
                فهرست مطالب
              </h2>
              <div className="grid sm:grid-cols-2 gap-2">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#section-${section.id}`}
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

          {/* هشدار */}
          <FadeIn delay={0.1}>
            <div className="mb-8 p-5 bg-orange-50 dark:bg-orange-950/20 border-r-4 border-orange-500 rounded-2xl">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-black text-orange-900 dark:text-orange-300 mb-2">
                    مهم
                  </h3>
                  <p className="text-sm text-orange-800 dark:text-orange-400 leading-relaxed">
                    با ثبت‌نام در دوره‌های سرآمد، شما تمام قوانین این صفحه را
                    مطالعه کرده و می‌پذیرید. لطفاً قبل از پرداخت، با دقت
                    مطالعه کنید.
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
                    id={`section-${section.id}`}
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
            <div className="mt-12 bg-gradient-to-br from-[#1e3a8a] to-[#0d9488] rounded-3xl p-8 lg:p-10 text-center text-white relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl" />

              <div className="relative">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center mb-5">
                  <Scale className="w-8 h-8 text-orange-300" />
                </div>

                <h2 className="text-2xl lg:text-3xl font-black mb-3">
                  سوالی درباره قوانین داری؟
                </h2>
                <p className="text-blue-100 max-w-lg mx-auto mb-8">
                  تیم حقوقی سرآمد آماده پاسخگویی به شماست
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-orange-500 hover:bg-orange-600 rounded-xl font-black shadow-xl shadow-orange-500/30 hover:scale-105 transition-all"
                  >
                    تماس با ما
                  </a>
                  <Link
                    href="/privacy"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 rounded-xl font-bold transition"
                  >
                    <Shield className="w-5 h-5" />
                    حریم خصوصی
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}