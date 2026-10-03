'use client';

import { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  User,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  Zap,
  Award,
  TrendingUp,
} from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import FadeIn from '@/components/animations/FadeIn';
import { cn } from '@/lib/utils';

const contactCards = [
  {
    icon: Phone,
    title: 'تماس تلفنی',
    value: SITE_CONFIG.phone,
    subtitle: 'پاسخ در ساعات کاری',
    color: 'brand' as const,
    href: `tel:${SITE_CONFIG.phone}`,
  },
  {
    icon: Mail,
    title: 'ایمیل',
    value: SITE_CONFIG.email,
    subtitle: 'پاسخ در کمتر از ۲۴ ساعت',
    color: 'teal' as const,
    href: `mailto:${SITE_CONFIG.email}`,
  },
  {
    icon: MapPin,
    title: 'آدرس',
    value: SITE_CONFIG.address,
    subtitle: 'شعبه مرکزی سرآمد',
    color: 'accent' as const,
    href: '#',
  },
  {
    icon: Clock,
    title: 'ساعات کاری',
    value: 'شنبه تا پنج‌شنبه',
    subtitle: '۹:۰۰ تا ۲۱:۰۰',
    color: 'purple' as const,
    href: '#',
  },
];

const faqs = [
  {
    q: 'چگونه در دوره‌ها ثبت‌نام کنم؟',
    a: 'برای ثبت‌نام می‌توانید از طریق سایت، تماس تلفنی یا مراجعه حضوری به شعبه اقدام کنید. پس از انتخاب دوره، اطلاعات خود را وارد کرده و پرداخت را انجام دهید.',
  },
  {
    q: 'آیا دوره‌ها مدرک دارند؟',
    a: 'بله، تمام دوره‌های سرآمد دارای مدرک معتبر پایان دوره هستند که پس از قبولی در آزمون نهایی صادر می‌شود.',
  },
  {
    q: 'امکان پرداخت اقساطی وجود دارد؟',
    a: 'بله، برای دوره‌های بالای ۳ میلیون تومان امکان پرداخت اقساطی فراهم است. برای اطلاعات بیشتر با ما تماس بگیرید.',
  },
  {
    q: 'آیا کلاس‌ها به‌صورت آنلاین هم برگزار می‌شوند؟',
    a: 'بله، ما دوره‌های حضوری، آنلاین و ترکیبی داریم. می‌توانید بر اساس شرایط خود، نوع برگزاری را انتخاب کنید.',
  },
  {
    q: 'در صورت عدم رضایت، امکان بازگشت وجه وجود دارد؟',
    a: 'بله، تا ۷ روز پس از شروع دوره، در صورت عدم رضایت، وجه پرداختی به‌طور کامل بازگردانده می‌شود.',
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 3000);
  };

  const colorMap = {
    brand: {
      bg: 'bg-blue-100 dark:bg-blue-950/50',
      icon: 'text-blue-800 dark:text-blue-300',
      hoverBg: 'group-hover:bg-blue-800',
      hoverIcon: 'group-hover:text-white',
      border: 'hover:border-blue-800 dark:hover:border-blue-300',
    },
    teal: {
      bg: 'bg-teal-100 dark:bg-teal-950/50',
      icon: 'text-teal-600 dark:text-teal-300',
      hoverBg: 'group-hover:bg-teal-500',
      hoverIcon: 'group-hover:text-white',
      border: 'hover:border-teal-500 dark:hover:border-teal-300',
    },
    accent: {
      bg: 'bg-orange-100 dark:bg-orange-950/50',
      icon: 'text-orange-600 dark:text-orange-300',
      hoverBg: 'group-hover:bg-orange-500',
      hoverIcon: 'group-hover:text-white',
      border: 'hover:border-orange-500 dark:hover:border-orange-300',
    },
    purple: {
      bg: 'bg-purple-100 dark:bg-purple-950/50',
      icon: 'text-purple-600 dark:text-purple-300',
      hoverBg: 'group-hover:bg-purple-600',
      hoverIcon: 'group-hover:text-white',
      border: 'hover:border-purple-600 dark:hover:border-purple-300',
    },
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
      {/* ===== هدر صفحه ===== */}
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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur border border-white/20 rounded-full text-white text-sm font-bold mb-5">
                <Sparkles className="w-4 h-4 text-orange-300" />
                <span>ارتباط با ما</span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-black text-white mb-4">
                تماس با آموزشگاه سرآمد
              </h1>

              <p className="text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed mb-8">
                هر سؤالی داری، با ما در میان بذار. تیم پشتیبانی سرآمد آماده
                کمکت هست.
              </p>
            </div>
          </FadeIn>

          {/* آمار */}
          <FadeIn delay={0.15}>
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="group bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-4 lg:p-5 hover:bg-white/15 hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Zap className="w-5 h-5 lg:w-6 lg:h-6 text-teal-400" />
                </div>
                <div className="text-2xl lg:text-3xl font-black text-white">
                  ۵ دقیقه
                </div>
                <div className="text-xs text-blue-200 mt-1">زمان پاسخ</div>
              </div>

              <div className="group bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-4 lg:p-5 hover:bg-white/15 hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Award className="w-5 h-5 lg:w-6 lg:h-6 text-teal-400" />
                </div>
                <div className="text-2xl lg:text-3xl font-black text-white">
                  ۲۴/۷
                </div>
                <div className="text-xs text-blue-200 mt-1">پشتیبانی</div>
              </div>

              <div className="group bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-4 lg:p-5 hover:bg-white/15 hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 text-teal-400" />
                </div>
                <div className="text-2xl lg:text-3xl font-black text-white">
                  ۹۸٪
                </div>
                <div className="text-xs text-blue-200 mt-1">رضایت</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== کارت‌های اطلاعات تماس ===== */}
      <section className="py-12 lg:py-16 -mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {contactCards.map((card, index) => {
              const Icon = card.icon;
              const colors = colorMap[card.color];

              return (
                <FadeIn
                  key={index}
                  delay={index * 0.1}
                  direction="up"
                  className="h-full"
                >
                  <a
                    href={card.href}
                    className={cn(
                      'group block h-full bg-white dark:bg-slate-900 rounded-3xl shadow-sm border-2 border-slate-100 dark:border-slate-800 p-6',
                      colors.border,
                      'hover:shadow-2xl hover:-translate-y-2 transition-all duration-300'
                    )}
                  >
                    <div
                      className={cn(
                        'w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110',
                        colors.bg,
                        colors.hoverBg
                      )}
                    >
                      <Icon
                        className={cn(
                          'w-7 h-7 transition-colors duration-300',
                          colors.icon,
                          colors.hoverIcon
                        )}
                      />
                    </div>
                    <h3 className="font-black text-slate-800 dark:text-slate-100 mb-2">
                      {card.title}
                    </h3>
                    <p className="text-sm text-slate-700 dark:text-slate-300 font-bold mb-1 line-clamp-2">
                      {card.value}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {card.subtitle}
                    </p>
                  </a>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== فرم تماس و اطلاعات ===== */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* فرم تماس */}
            <FadeIn className="lg:col-span-3">
              <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-8 lg:p-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-brand-100 dark:bg-brand-950/50 flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-brand-800 dark:text-brand-300" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100">
                      ارسال پیام
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      فرم زیر را پر کنید، در اسرع وقت پاسخ می‌دهیم
                    </p>
                  </div>
                </div>

                {isSubmitted ? (
                  <div className="py-12 text-center">
                    <div className="w-20 h-20 mx-auto rounded-full bg-teal-100 dark:bg-teal-950/50 flex items-center justify-center mb-5 animate-bounce">
                      <CheckCircle2 className="w-10 h-10 text-teal-600 dark:text-teal-300" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-3">
                      پیام شما ارسال شد! 🎉
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      تیم پشتیبانی سرآمد در اسرع وقت با شما تماس خواهد گرفت.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                          نام و نام خانوادگی *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            placeholder="مثلاً: علی محمدی"
                            className="w-full pr-11 pl-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-brand-500 focus:bg-white dark:focus:bg-slate-900 transition"
                          />
                          <User className="w-4 h-4 text-slate-400 absolute top-1/2 right-4 -translate-y-1/2" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                          شماره تماس *
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                phone: e.target.value,
                              })
                            }
                            placeholder="۰۹۳۶۲۸۴۷۹۲۲"
                            className="w-full pr-11 pl-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-brand-500 focus:bg-white dark:focus:bg-slate-900 transition"
                          />
                          <Phone className="w-4 h-4 text-slate-400 absolute top-1/2 right-4 -translate-y-1/2" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                        ایمیل
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="example@email.com"
                          className="w-full pr-11 pl-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-brand-500 focus:bg-white dark:focus:bg-slate-900 transition"
                        />
                        <Mail className="w-4 h-4 text-slate-400 absolute top-1/2 right-4 -translate-y-1/2" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                        موضوع *
                      </label>
                      <select
                        required
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 focus:outline-none focus:border-brand-500 focus:bg-white dark:focus:bg-slate-900 transition cursor-pointer"
                      >
                        <option value="">یک موضوع انتخاب کنید</option>
                        <option value="مشاوره دوره">مشاوره دوره</option>
                        <option value="ثبت‌نام">ثبت‌نام</option>
                        <option value="پشتیبانی">پشتیبانی</option>
                        <option value="شکایت">شکایت</option>
                        <option value="همکاری">همکاری</option>
                        <option value="سایر">سایر</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                        پیام شما *
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder="پیام خود را اینجا بنویسید..."
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-brand-500 focus:bg-white dark:focus:bg-slate-900 transition resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white rounded-xl font-black hover:shadow-xl transition-all hover:scale-[1.02] hover:gap-3"
                    >
                      <Send className="w-5 h-5" />
                      ارسال پیام
                    </button>
                  </form>
                )}
              </div>
            </FadeIn>

            {/* ستون راست - نقشه و اطلاعات */}
            <div className="lg:col-span-2 space-y-6">
              {/* نقشه */}
              <FadeIn direction="left" delay={0.15}>
                <div className="bg-gradient-to-br from-[#1e3a8a] to-[#0d9488] rounded-3xl shadow-lg overflow-hidden group">
                  <div className="relative aspect-square flex items-center justify-center">
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage:
                          'radial-gradient(circle, white 1px, transparent 1px)',
                        backgroundSize: '20px 20px',
                      }}
                    />

                    {/* افکت درخشش */}
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl group-hover:bg-teal-400/30 transition-colors" />

                    <div className="relative text-center text-white p-8">
                      <div className="w-20 h-20 mx-auto rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
                        <MapPin className="w-10 h-10 text-teal-400" />
                      </div>
                      <h3 className="text-xl font-black mb-3">
                        شعبه مرکزی سرآمد
                      </h3>
                      <p className="text-sm text-blue-100 leading-relaxed mb-5">
                        {SITE_CONFIG.address}
                      </p>
                      <a
                        href="https://maps.google.com/?q=38.0800,46.2919"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 rounded-xl text-white font-bold transition text-sm hover:gap-3"
                      >
                        <MapPin className="w-4 h-4" />
                        مشاهده روی نقشه
                      </a>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* اطلاعات تماس سریع */}
              <FadeIn direction="left" delay={0.25}>
                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-6">
                  <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 mb-5 pb-4 border-b border-slate-100 dark:border-slate-800">
                    راه‌های ارتباط سریع
                  </h3>

                  <div className="space-y-3">
                    <a
                      href={`tel:${SITE_CONFIG.phone}`}
                      className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 hover:bg-brand-50 dark:hover:bg-slate-800 rounded-xl transition group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Phone className="w-5 h-5 text-blue-800 dark:text-blue-300" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          تماس تلفنی
                        </div>
                        <div className="text-sm font-bold text-slate-800 dark:text-slate-100">
                          {SITE_CONFIG.phone}
                        </div>
                      </div>
                    </a>

                    <a
                      href={`mailto:${SITE_CONFIG.email}`}
                      className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 hover:bg-teal-50 dark:hover:bg-slate-800 rounded-xl transition group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Mail className="w-5 h-5 text-teal-600 dark:text-teal-300" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          ایمیل
                        </div>
                        <div className="text-sm font-bold text-slate-800 dark:text-slate-100">
                          {SITE_CONFIG.email}
                        </div>
                      </div>
                    </a>

                    <a
                      href="https://wa.me/989362847922"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 hover:bg-green-50 dark:hover:bg-slate-800 rounded-xl transition group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-950/50 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                        💬
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          واتساپ
                        </div>
                        <div className="text-sm font-bold text-slate-800 dark:text-slate-100">
                          ۰۹۳۶۲۸۴۷۹۲۲
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ===== سوالات متداول ===== */}
      <section className="py-12 lg:py-16 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-1.5 bg-brand-100 dark:bg-brand-950/50 text-brand-800 dark:text-brand-300 rounded-full text-sm font-bold mb-4">
                ❓ سوالات متداول
              </div>
              <h2 className="text-3xl lg:text-4xl font-black text-slate-800 dark:text-slate-100 mb-3">
                سوالات پرتکرار کاربران
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                پاسخ سوالات رایج را اینجا ببینید
              </p>
            </div>
          </FadeIn>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <FadeIn key={index} delay={index * 0.08} direction="up">
                <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden hover:border-brand-200 dark:hover:border-brand-800 transition">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-right"
                  >
                    <span className="font-black text-slate-800 dark:text-slate-100 flex-1">
                      {faq.q}
                    </span>
                    <div
                      className={cn(
                        'w-8 h-8 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center flex-shrink-0 transition-transform duration-300',
                        openFaq === index && 'rotate-180'
                      )}
                    >
                      <ChevronDown className="w-4 h-4 text-brand-800 dark:text-brand-300" />
                    </div>
                  </button>

                  {openFaq === index && (
                    <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-200 dark:border-slate-700 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}