# ============================================================
# Saramad - Auto Create All Code Files
# ============================================================

$ErrorActionPreference = "Stop"
Set-Location "E:\site\saramad"

Write-Host "Creating all code files..." -ForegroundColor Cyan

# ============================================================
# 1. src/lib/utils.ts
# ============================================================
@'
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isClient = typeof window !== 'undefined';

export function scrollToElement(id: string): void {
  if (!isClient) return;
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
'@ | Out-File -FilePath "src\lib\utils.ts" -Encoding UTF8

Write-Host "  Created: src\lib\utils.ts" -ForegroundColor Green

# ============================================================
# 2. src/lib/format.ts
# ============================================================
@'
export function toPersianNumber(num: number | string): string {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(num).replace(/\d/g, (d) => persianDigits[parseInt(d)]);
}

export function formatPrice(price: number): string {
  return toPersianNumber(price.toLocaleString('en-US')) + ' تومان';
}

export function formatPriceShort(price: number): string {
  if (price >= 1000000) {
    const millions = price / 1000000;
    return toPersianNumber(
      millions.toLocaleString('fa-IR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 1,
      })
    ) + ' م';
  }
  return toPersianNumber(price.toLocaleString('en-US')) + ' ت';
}

export function formatCount(num: number): string {
  return toPersianNumber(num.toLocaleString('en-US'));
}

export function formatCountShort(num: number): string {
  if (num >= 1000) {
    const thousands = num / 1000;
    return (
      toPersianNumber(
        thousands.toLocaleString('fa-IR', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 1,
        })
      ) + ' هزار'
    );
  }
  return toPersianNumber(num);
}

export function formatDuration(hours: number): string {
  return toPersianNumber(hours) + ' ساعت';
}

export function getModeLabel(mode: 'online' | 'in-person' | 'hybrid'): string {
  const labels = {
    online: 'آنلاین',
    'in-person': 'حضوری',
    hybrid: 'ترکیبی',
  };
  return labels[mode];
}

export function getModeIcon(mode: 'online' | 'in-person' | 'hybrid'): string {
  const icons = {
    online: '💻',
    'in-person': '🏢',
    hybrid: '🔄',
  };
  return icons[mode];
}

export function getModeColor(
  mode: 'online' | 'in-person' | 'hybrid'
): 'brand' | 'accent' | 'teal' {
  const colors = {
    online: 'teal' as const,
    'in-person': 'brand' as const,
    hybrid: 'accent' as const,
  };
  return colors[mode];
}

export function getLevelLabel(
  level: 'beginner' | 'intermediate' | 'advanced'
): string {
  const labels = {
    beginner: 'مقدماتی',
    intermediate: 'متوسط',
    advanced: 'پیشرفته',
  };
  return labels[level];
}
'@ | Out-File -FilePath "src\lib\format.ts" -Encoding UTF8

Write-Host "  Created: src\lib\format.ts" -ForegroundColor Green

# ============================================================
# 3. src/lib/constants.ts
# ============================================================
@'
export const SITE_CONFIG = {
  name: 'آموزشگاه سرآمد',
  description: 'مجتمع آموزش فنی و حرفه‌ای',
  slogan: 'مسیر حرفه‌ای شدن از سرآمد شروع می‌شود',
  phone: '۰۲۱-۱۲۳۴۵۶۷۸',
  email: 'info@saramad.ir',
  address: 'تهران، خیابان ولیعصر، بالاتر از میدان ونک، پلاک ۱۲۳',
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
    description: 'تجربه واقعی کلاس، تعامل چهره‌به‌چهره با استاد و هم‌کلاسی‌ها',
    features: ['تعامل مستقیم با استاد', 'کارگاه‌های عملی', 'شبکه‌سازی با هم‌کلاسی‌ها'],
    href: '/courses/in-person',
  },
  {
    id: 'online',
    title: 'کلاس آنلاین',
    icon: '💻',
    description: 'از هر نقطه ایران، با کیفیت HD و پشتیبانی زنده',
    features: ['کلاس زنده + ضبط جلسات', 'دسترسی از موبایل و کامپیوتر', 'پشتیبانی ۲۴/۷'],
    href: '/courses/online',
    featured: true,
  },
  {
    id: 'hybrid',
    title: 'دوره ترکیبی',
    icon: '🔄',
    description: 'بهترین هر دو دنیا؛ بخشی حضوری و بخشی آنلاین',
    features: ['انعطاف در زمان', 'هزینه بهینه', 'یادگیری موثرتر'],
    href: '/courses/hybrid',
  },
];
'@ | Out-File -FilePath "src\lib\constants.ts" -Encoding UTF8

Write-Host "  Created: src\lib\constants.ts" -ForegroundColor Green

# ============================================================
# 4. src/types/index.ts
# ============================================================
@'
export type CourseMode = 'online' | 'in-person' | 'hybrid';
export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  mode: CourseMode;
  level: CourseLevel;
  duration: number;
  sessions: number;
  price: {
    'in-person'?: number;
    online?: number;
    hybrid?: number;
  };
  image: string;
  instructor: Instructor;
  rating: number;
  studentsCount: number;
  capacity: number;
  remainingCapacity: number;
  startDate: string;
  schedule: string;
  prerequisites: string[];
  certificate: boolean;
  tags: string[];
}

export interface Instructor {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatar: string;
  specialties: string[];
  coursesCount: number;
  studentsCount: number;
  rating: number;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  course: string;
  rating: number;
  comment: string;
  date: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  category: string;
  author: string;
  date: string;
  readTime: number;
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  mapUrl: string;
  image: string;
  isActive: boolean;
}
'@ | Out-File -FilePath "src\types\index.ts" -Encoding UTF8

Write-Host "  Created: src\types\index.ts" -ForegroundColor Green

Write-Host "`nDone! Base files created." -ForegroundColor Green
Write-Host "Next: Run the second script for data and components." -ForegroundColor Cyan