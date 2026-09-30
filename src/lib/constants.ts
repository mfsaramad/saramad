export const SITE_CONFIG = {
  name: 'آموزشگاه سرآمد',
  description: 'مجتمع آموزش فنی و حرفه‌ای',
  slogan: 'مسیر حرفه‌ای شدن از سرآمد شروع می‌شود',
  phone: '۰۹۳۶۲۸۴۷۹۲۲',
  email: 'info@saramad.ir',
  address: 'تبریز، خیابان بهار، روبروی تعاون روستایی',
  socials: {
    instagram: 'https://instagram.com/saramad',
    telegram: 'https://t.me/saramad',
    linkedin: 'https://linkedin.com/company/saramad',
    youtube: 'https://youtube.com/@saramad',
  },
};

export const NAV_LINKS = [
  { href: '/', label: 'خانه' },
  { href: '/courses', label: 'دوره‌ها' },
  { href: '/live', label: 'کلاس آنلاین' },
  { href: '/exams', label: 'آزمون آنلاین' },
  { href: '/shop', label: 'فروشگاه' },
  { href: '/instructors', label: 'اساتید' },
  { href: '/branches', label: 'شعبه‌ها' },
  { href: '/blog', label: 'وبلاگ' },
  { href: '/contact', label: 'تماس' },
];

export const LEARNING_MODES = [
  {
    id: 'in-person',
    title: 'کلاس حضوری',
    icon: '🏢',
    description:
      'تجربه واقعی کلاس، تعامل چهره‌به‌چهره با استاد و هم‌کلاسی‌ها در محیط آموزشی مجهز.',
    features: [
      'تعامل مستقیم با استاد',
      'کارگاه‌های عملی',
      'شبکه‌سازی با هم‌کلاسی‌ها',
    ],
    href: '/courses/in-person',
  },
  {
    id: 'online',
    title: 'کلاس آنلاین',
    icon: '💻',
    description:
      'از هر نقطه ایران، با کیفیت HD و پشتیبانی زنده در کلاس‌های آنلاین سرآمد شرکت کن.',
    features: [
      'کلاس زنده + ضبط جلسات',
      'دسترسی از موبایل و کامپیوتر',
      'پشتیبانی ۲۴/۷',
    ],
    href: '/courses/online',
    featured: true,
  },
  {
    id: 'hybrid',
    title: 'دوره ترکیبی',
    icon: '🔄',
    description:
      'بهترین هر دو دنیا؛ بخشی از آموزش حضوری و بخشی آنلاین، متناسب با نیاز و زمان شما.',
    features: ['انعطاف در زمان', 'هزینه بهینه', 'یادگیری موثرتر'],
    href: '/courses/hybrid',
  },
];