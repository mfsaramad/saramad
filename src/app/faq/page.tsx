'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  HelpCircle,
  ChevronDown,
  MessageSquare,
  Phone,
  Mail,
  Sparkles,
  BookOpen,
  CreditCard,
  Users,
  Award,
  Shield,
  Clock,
} from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import FadeIn from '@/components/animations/FadeIn';
import { cn } from '@/lib/utils';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  icon: typeof HelpCircle;
  color: 'brand' | 'teal' | 'accent';
}

const categories = [
  { id: 'all', label: 'همه', icon: '📚' },
  { id: 'register', label: 'ثبت‌نام', icon: '📝' },
  { id: 'payment', label: 'پرداخت', icon: '💳' },
  { id: 'courses', label: 'دوره‌ها', icon: '🎓' },
  { id: 'support', label: 'پشتیبانی', icon: '💬' },
  { id: 'certificate', label: 'مدرک', icon: '🏆' },
];

const faqs: FAQItem[] = [
  {
    id: 1,
    question: 'چگونه در دوره‌های سرآمد ثبت‌نام کنم؟',
    answer:
      'برای ثبت‌نام می‌توانید از سه راه اقدام کنید: ۱) از طریق سایت و صفحه دوره مورد نظر، ۲) تماس تلفنی با شماره پشتیبانی، ۳) مراجعه حضوری به شعبه. پس از انتخاب دوره، اطلاعات خود را وارد کرده و پرداخت را انجام دهید. بلافاصله پس از پرداخت، دسترسی به دوره فعال می‌شود.',
    category: 'register',
    icon: BookOpen,
    color: 'brand',
  },
  {
    id: 2,
    question: 'آیا دوره‌ها مدرک معتبر دارند؟',
    answer:
      'بله، تمام دوره‌های سرآمد دارای مدرک معتبر پایان دوره هستند که پس از قبولی در آزمون نهایی صادر می‌شود. این مدرک قابل ترجمه و استعلام رسمی است و در بازار کار ارزش بالایی دارد.',
    category: 'certificate',
    icon: Award,
    color: 'accent',
  },
  {
    id: 3,
    question: 'امکان پرداخت اقساطی وجود دارد؟',
    answer:
      'بله، برای دوره‌های بالای ۳ میلیون تومان امکان پرداخت اقساطی فراهم است. شما می‌توانید هزینه دوره را در ۲ یا ۳ قسط پرداخت کنید. برای اطلاعات بیشتر با تیم پشتیبانی تماس بگیرید.',
    category: 'payment',
    icon: CreditCard,
    color: 'teal',
  },
  {
    id: 4,
    question: 'آیا کلاس‌ها به‌صورت آنلاین هم برگزار می‌شوند؟',
    answer:
      'بله، ما سه نوع دوره داریم: حضوری، آنلاین و ترکیبی. در دوره‌های آنلاین، کلاس‌ها به‌صورت زنده برگزار می‌شوند و پس از هر جلسه، ویدیوی ضبط‌شده در دسترس دانشجویان قرار می‌گیرد.',
    category: 'courses',
    icon: Users,
    color: 'brand',
  },
  {
    id: 5,
    question: 'در صورت عدم رضایت، امکان بازگشت وجه وجود دارد؟',
    answer:
      'بله، تا ۷ روز پس از شروع دوره، در صورت عدم رضایت، وجه پرداختی به‌طور کامل بازگردانده می‌شود. پس از این مدت، امکان بازگشت وجه وجود ندارد.',
    category: 'payment',
    icon: Shield,
    color: 'teal',
  },
  {
    id: 6,
    question: 'پشتیبانی دوره‌ها چگونه است؟',
    answer:
      'پشتیبانی سرآمد به‌صورت ۲۴/۷ فعال است. شما می‌توانید از طریق تلفن، واتساپ، تلگرام یا ایمیل با ما در تماس باشید. پاسخگویی معمولاً در کمتر از ۵ دقیقه انجام می‌شود.',
    category: 'support',
    icon: MessageSquare,
    color: 'accent',
  },
  {
    id: 7,
    question: 'مدت زمان دسترسی به محتوای دوره چقدر است؟',
    answer:
      'دسترسی شما به محتوای دوره‌های آنلاین و ویدیوهای ضبط‌شده مادام‌العمر است. یعنی هر زمان که بخواهید می‌توانید به محتوا دسترسی داشته باشید و مرور کنید.',
    category: 'courses',
    icon: Clock,
    color: 'brand',
  },
  {
    id: 8,
    question: 'چطور می‌توانم از کیفیت دوره‌ها مطمئن شوم؟',
    answer:
      'شما می‌توانید قبل از ثبت‌نام، در جلسات آزمایشی رایگان شرکت کنید. همچنین نظرات دانشجویان قبلی را در صفحه هر دوره ببینید. ما به کیفیت دوره‌هایمان تضمین می‌دهیم.',
    category: 'courses',
    icon: Sparkles,
    color: 'teal',
  },
  {
    id: 9,
    question: 'آیا برای ثبت‌نام محدودیت سنی وجود دارد؟',
    answer:
      'خیر، دوره‌های سرآمد برای همه علاقه‌مندان بالای ۱۲ سال مناسب است. برخی دوره‌های تخصصی ممکن است پیش‌نیاز خاصی داشته باشند که در صفحه دوره ذکر شده است.',
    category: 'register',
    icon: Users,
    color: 'accent',
  },
  {
    id: 10,
    question: 'چگونه می‌توانم رمز عبورم را بازیابی کنم؟',
    answer:
      'در صفحه ورود، روی «فراموشی رمز عبور؟» کلیک کنید. سپس ایمیل یا شماره تماس خود را وارد کنید. کد تأیید برای شما ارسال می‌شود و می‌توانید رمز جدید تعیین کنید.',
    category: 'support',
    icon: Shield,
    color: 'brand',
  },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const filteredFaqs =
    activeCategory === 'all'
      ? faqs
      : faqs.filter((f) => f.category === activeCategory);

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
              <HelpCircle className="w-4 h-4 text-orange-300" />
              <span>سوالات متداول</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-black text-white mb-4">
              سوالات پرتکرار کاربران
            </h1>

            <p className="text-lg text-blue-100 leading-relaxed">
              پاسخ سوالات رایج درباره دوره‌ها، ثبت‌نام، پرداخت و پشتیبانی
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ===== محتوا ===== */}
      <section className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* دسته‌بندی‌ها */}
          <FadeIn>
            <div className="flex justify-center mb-10">
              <div className="inline-flex items-center gap-1 p-1.5 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-x-auto no-scrollbar max-w-full">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all',
                      activeCategory === cat.id
                        ? 'bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white shadow-md'
                        : 'text-slate-600 dark:text-slate-400 hover:text-brand-800 dark:hover:text-brand-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    )}
                  >
                    <span>{cat.icon}</span>
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* سوالات */}
          <div className="space-y-3">
            {filteredFaqs.map((faq, index) => {
              const Icon = faq.icon;
              const colors = colorMap[faq.color];
              const isOpen = openFaq === faq.id;

              return (
                <FadeIn key={faq.id} delay={index * 0.05} direction="up">
                  <div
                    className={cn(
                      'bg-white dark:bg-slate-900 rounded-2xl border-2 transition-all overflow-hidden',
                      isOpen
                        ? 'border-brand-200 dark:border-brand-800 shadow-lg'
                        : 'border-slate-100 dark:border-slate-800 hover:border-brand-200 dark:hover:border-brand-800'
                    )}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                      className="w-full flex items-center gap-4 p-5 text-right"
                    >
                      <div
                        className={cn(
                          'w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0',
                          colors.bg
                        )}
                      >
                        <Icon className={cn('w-5 h-5', colors.icon)} />
                      </div>

                      <span className="flex-1 font-black text-slate-800 dark:text-slate-100">
                        {faq.question}
                      </span>

                      <div
                        className={cn(
                          'w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center flex-shrink-0 transition-transform duration-300',
                          isOpen && 'rotate-180'
                        )}
                      >
                        <ChevronDown className="w-4 h-4 text-brand-800 dark:text-brand-300" />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 mr-15 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-4">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                </FadeIn>
              );
            })}
          </div>

          {/* سوالی داری؟ */}
          <FadeIn delay={0.3}>
            <div className="mt-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 lg:p-10 text-center text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />

              <div className="relative">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center mb-5">
                  <MessageSquare className="w-8 h-8 text-teal-400" />
                </div>

                <h2 className="text-2xl lg:text-3xl font-black mb-3">
                  سوالی داری که اینجا نیست؟
                </h2>
                <p className="text-blue-100 max-w-lg mx-auto mb-8">
                  تیم پشتیبانی سرآمد آماده پاسخگویی به شماست
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={`tel:${SITE_CONFIG.phone}`}
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-orange-500 hover:bg-orange-600 rounded-xl font-black shadow-xl shadow-orange-500/30 hover:scale-105 transition-all"
                  >
                    <Phone className="w-5 h-5" />
                    تماس تلفنی
                  </a>
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 rounded-xl font-bold transition"
                  >
                    <Mail className="w-5 h-5" />
                    ارسال ایمیل
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