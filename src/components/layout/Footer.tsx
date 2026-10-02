import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

const footerLinks = {
  quickLinks: [
    { href: '/courses', label: 'دوره‌های آموزشی' },
    { href: '/instructors', label: 'اساتید' },
    { href: '/blog', label: 'وبلاگ' },
    { href: '/contact', label: 'تماس با ما' },
  ],
  support: [
    { href: '/faq', label: 'سوالات متداول' },
    { href: '/terms', label: 'قوانین و مقررات' },
    { href: '/privacy', label: 'حریم خصوصی' },
  ],
};

const socials = [
  {
    href: SITE_CONFIG.socials.instagram,
    emoji: '📷',
    label: 'اینستاگرام',
  },
  {
    href: SITE_CONFIG.socials.telegram,
    emoji: '✈️',
    label: 'تلگرام',
  },
  {
    href: SITE_CONFIG.socials.linkedin,
    emoji: '💼',
    label: 'لینکدین',
  },
  {
    href: SITE_CONFIG.socials.youtube,
    emoji: '🎬',
    label: 'یوتیوب',
  },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* ستون اول — معرفی */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="w-14 h-14 flex items-center justify-center">
                {/* لوگوی سفید - همیشه سفید چون فوتر تیره‌ست */}
                <Image
                  src="/logo-white.png"
                  alt="لوگوی آموزشگاه سرآمد"
                  width={56}
                  height={56}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="text-xl font-black text-white">سرآمد</div>
                <div className="text-xs text-slate-400">
                  مجتمع آموزش فنی و حرفه‌ای
                </div>
              </div>
            </Link>

            <p className="text-sm leading-relaxed text-slate-400 mb-6 max-w-md">
              آموزشگاه سرآمد با ارائه دوره‌های حضوری، آنلاین و ترکیبی در
              زمینه‌های فنی و حرفه‌ای، مسیر حرفه‌ای شدن شما را هموار می‌کند.
            </p>

            <div className="flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-brand-800 flex items-center justify-center transition-all hover:scale-110 text-lg"
                >
                  {social.emoji}
                </a>
              ))}
            </div>
          </div>

          {/* ستون دوم */}
          <div>
            <h3 className="text-white font-bold mb-5">دسترسی سریع</h3>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-orange-500 transition" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ستون سوم */}
          <div>
            <h3 className="text-white font-bold mb-5">پشتیبانی</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-teal-500 transition" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* بخش تماس */}
        <div className="grid md:grid-cols-3 gap-6 mt-12 pt-10 border-t border-slate-800">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-1">آدرس</div>
              <div className="text-sm text-slate-300">
                {SITE_CONFIG.address}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-1">تلفن تماس</div>
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="text-sm text-slate-300 hover:text-white transition"
              >
                {SITE_CONFIG.phone}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-1">ایمیل</div>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="text-sm text-slate-300 hover:text-white transition"
              >
                {SITE_CONFIG.email}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* نوار پایین */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-xs text-slate-500 text-center md:text-right">
              © {new Date().getFullYear()} آموزشگاه سرآمد. تمامی حقوق محفوظ است.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <Link href="/terms" className="hover:text-white transition">
                قوانین و مقررات
              </Link>
              <span className="w-1 h-1 rounded-full bg-slate-700" />
              <Link href="/privacy" className="hover:text-white transition">
                حریم خصوصی
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}